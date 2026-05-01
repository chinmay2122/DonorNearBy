require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_KEY in environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Simple authentication middleware for admin routes
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  // Decode simple JWT or validate token (for demo, we'll validate admin existence)
  req.adminToken = token;
  next();
};

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Blood Bank API is running' });
});

// Dashboard overview stats
app.get('/api/stats/overview', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [
      donorsResult,
      centersResult,
      upcomingCampsResult,
      organisedCampsResult,
      totalDonationsResult,
    ] = await Promise.all([
      supabase.from('donors').select('*', { count: 'exact', head: true }),
      supabase.from('blood_banks').select('*', { count: 'exact', head: true }),
      supabase
        .from('donations')
        .select('*', { count: 'exact', head: true })
        .gte('availability_date', today)
        .eq('status', 'pending'),
      supabase
        .from('donations')
        .select('*', { count: 'exact', head: true })
        .in('status', ['approved', 'completed']),
      supabase.from('donations').select('*', { count: 'exact', head: true }),
    ]);

    const results = [
      donorsResult,
      centersResult,
      upcomingCampsResult,
      organisedCampsResult,
      totalDonationsResult,
    ];

    const failedResult = results.find((result) => result.error);
    if (failedResult?.error) {
      return res.status(400).json({ error: failedResult.error.message });
    }

    const registeredDonors = donorsResult.count || 0;
    const bloodCenters = centersResult.count || 0;
    const upcomingCamps = upcomingCampsResult.count || 0;
    const campsOrganised = organisedCampsResult.count || totalDonationsResult.count || 0;

    res.json({
      registered_donors: registeredDonors,
      blood_centers: bloodCenters,
      upcoming_camps: upcomingCamps,
      camps_organised: campsOrganised,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch overview stats' });
  }
});

// Get all blood banks
app.get('/api/blood-banks', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blood_banks')
      .select('*');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Format inventory data
    const formattedData = data.map((bank) => ({
      ...bank,
      inventory: bank.inventory || {},
    }));

    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blood banks' });
  }
});

// Get blood bank by ID
app.get('/api/blood-banks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('blood_banks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Blood bank not found' });
    }

    res.json({
      ...data,
      inventory: data.inventory || {},
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blood bank' });
  }
});

// Search blood banks by blood type
app.get('/api/search', async (req, res) => {
  try {
    const { bloodType } = req.query;

    if (!bloodType) {
      return res.status(400).json({ error: 'Blood type is required' });
    }

    const { data, error } = await supabase
      .from('blood_banks')
      .select('*');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Filter banks that have the requested blood type
    const filtered = data.filter((bank) => {
      const inventory = bank.inventory || {};
      return inventory[bloodType] && inventory[bloodType] > 0;
    });

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search blood banks' });
  }
});

// Add new blood bank (Admin)
app.post('/api/blood-banks', async (req, res) => {
  try {
    const { name, address, city, phone, latitude, longitude, hours, inventory } = req.body;

    if (!name || !address || !city || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('blood_banks')
      .insert([
        {
          name,
          address,
          city,
          phone,
          latitude: latitude || 0,
          longitude: longitude || 0,
          hours: hours || '24/7',
          inventory: inventory || {},
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blood bank' });
  }
});

// Update blood bank inventory
app.put('/api/blood-banks/:id/inventory', async (req, res) => {
  try {
    const { id } = req.params;
    const { inventory } = req.body;

    if (!inventory) {
      return res.status(400).json({ error: 'Inventory is required' });
    }

    const { data, error } = await supabase
      .from('blood_banks')
      .update({ inventory })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

// Update blood bank details
app.put('/api/blood-banks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, phone, hours } = req.body;

    const { data, error } = await supabase
      .from('blood_banks')
      .update({
        name,
        address,
        city,
        phone,
        hours,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blood bank' });
  }
});

// Delete blood bank
app.delete('/api/blood-banks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('blood_banks')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Blood bank deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blood bank' });
  }
});

// ============================================
// ADMIN ROUTES
// ============================================

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Simple token (in production, use JWT)
    const token = Buffer.from(`${data.id}:${data.username}`).toString('base64');

    res.json({
      success: true,
      token,
      admin: {
        id: data.id,
        username: data.username,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get all pending donors (for admin dashboard)
app.get('/api/admin/donors/pending', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending donors' });
  }
});

// Get all donors (approved, pending, rejected)
app.get('/api/admin/donors', authenticate, async (req, res) => {
  try {
    const { status } = req.query;

    let query = supabase.from('donors').select('*');

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});

// Approve donor
app.put('/api/admin/donors/:id/approve', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('donors')
      .update({
        status: 'approved',
        approval_date: new Date(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Donor approved successfully',
      donor: data,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve donor' });
  }
});

// Reject donor
app.put('/api/admin/donors/:id/reject', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const { data, error } = await supabase
      .from('donors')
      .update({
        status: 'rejected',
        rejection_reason: reason || 'No reason provided',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Donor rejected successfully',
      donor: data,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject donor' });
  }
});

// ============================================
// DONOR REGISTRATION & SEARCH ROUTES
// ============================================

// Register new donor
app.post('/api/donors/register', async (req, res) => {
  try {
    const { name, email, phone, blood_type, age, city, address, lat, lng } = req.body;

    if (!name || !email || !phone || !blood_type || !city || !lat || !lng) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('donors')
      .insert([
        {
          name,
          email,
          phone,
          blood_type,
          age,
          city,
          address,
          lat,
          lng,
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Registration submitted. Waiting for admin approval.',
      donor: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: 'Donor registration failed' });
  }
});

// Get all approved donors
app.get('/api/donors/approved', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});

// Search donors by blood type using either geolocation (lat/lng) or location text.
app.get('/api/donors/search', async (req, res) => {
  try {
    const { blood_type, location, lat, lng } = req.query;
    const radius = parseFloat(req.query.radius || '30');
    const searchLocation = (location || '').trim();
    const hasCoordinates = lat !== undefined && lng !== undefined;

    if (!blood_type) {
      return res.status(400).json({ error: 'Blood type is required' });
    }

    if (!hasCoordinates && !searchLocation) {
      return res.status(400).json({ error: 'Provide either location text or latitude/longitude' });
    }

    // Mode 1: Geolocation-based search for donors and blood centers in a radius.
    if (hasCoordinates) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);

      if (Number.isNaN(userLat) || Number.isNaN(userLng)) {
        return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
      }

      const { data: donorData, error: donorError } = await supabase
        .from('donors')
        .select('*')
        .eq('blood_type', blood_type)
        .eq('status', 'approved');

      if (donorError) {
        return res.status(400).json({ error: donorError.message });
      }

      const nearbyDonors = donorData
        .map((donor) => {
          const distance = calculateDistance(userLat, userLng, donor.lat, donor.lng);
          return { ...donor, distance_km: distance };
        })
        .filter((donor) => donor.distance_km <= radius)
        .sort((a, b) => a.distance_km - b.distance_km);

      const { data: centerData, error: centerError } = await supabase
        .from('blood_banks')
        .select('*');

      if (centerError) {
        return res.status(400).json({ error: centerError.message });
      }

      const nearbyCenters = centerData
        .map((center) => {
          const inventory = center.inventory || {};
          const availableUnits = Number(inventory[blood_type] || 0);
          const distance = calculateDistance(userLat, userLng, center.lat, center.lng);

          return {
            id: center.id,
            name: center.name,
            city: center.city,
            address: center.address,
            phone: center.phone,
            blood_type,
            available_units: availableUnits,
            distance_km: distance,
          };
        })
        .filter((center) => center.distance_km <= radius)
        .sort((a, b) => a.distance_km - b.distance_km);

      return res.json({
        mode: 'geo',
        blood_type,
        radius_km: radius,
        user_location: {
          lat: userLat,
          lng: userLng,
        },
        donor_count: nearbyDonors.length,
        center_count: nearbyCenters.length,
        donors: nearbyDonors,
        blood_centers: nearbyCenters,
      });
    }

    // Mode 2: Text-based donor search (fallback).
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .eq('blood_type', blood_type)
      .eq('status', 'approved')
      .or(`city.ilike.%${searchLocation}%,address.ilike.%${searchLocation}%`)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      mode: 'text',
      count: data.length,
      blood_type,
      location: searchLocation,
      donors: data,
      blood_centers: [],
    });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

function calculateDistance(lat1, lon1, lat2, lon2) {
  const latitude1 = parseFloat(lat1);
  const longitude1 = parseFloat(lon1);
  const latitude2 = parseFloat(lat2);
  const longitude2 = parseFloat(lon2);

  if ([latitude1, longitude1, latitude2, longitude2].some(Number.isNaN)) {
    return Number.POSITIVE_INFINITY;
  }

  const R = 6371;
  const dLat = ((latitude2 - latitude1) * Math.PI) / 180;
  const dLon = ((longitude2 - longitude1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude1 * Math.PI) / 180) *
      Math.cos((latitude2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return parseFloat(distance.toFixed(2));
}

// Get donor by ID
app.get('/api/donors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donor' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🩸 Blood Bank API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`\n📍 Donor Registration: POST /api/donors/register`);
  console.log(`🔍 Search Donors: GET /api/donors/search?blood_type=B+&lat=12.9716&lng=77.5946&radius=30`);
});
