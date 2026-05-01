# Blood Bank Management System - Feature Guide

## 🆕 New Features

### 1. 👥 Donor Registration & Approval System

Users can now register as blood donors. The system requires admin approval before they become visible in search results.

**Flow:**
1. User fills out registration form
2. Location is captured via geolocation
3. Form submitted with **PENDING** status
4. Admin reviews in dashboard
5. Admin approves/rejects with optional reason
6. User status changes to APPROVED or REJECTED

**Registration Form Fields:**
- Full Name (required)
- Email (required, unique)
- Phone (required)
- Blood Type (required)
- Age
- City (required)
- Address
- Location (Latitude & Longitude - required)

---

### 2. 🔒 Admin Panel & Dashboard

Access restricted admin features with demo credentials.

**Features:**
- ✅ Admin Login
- ✅ View all pending donor registrations
- ✅ Approve donors with details
- ✅ Reject donors with reasons
- ✅ Filter by status (Pending, Approved, Rejected)
- ✅ View real-time statistics
- ✅ Logout functionality

**Demo Credentials:**
```
Username: admin
Password: <set-in-your-env>

OR

Username: superadmin
Password: <set-in-your-env>
```

**Admin Dashboard Stats:**
- Total Pending Approvals
- Total Approved Donors
- Total Rejected Donors

---

### 3. 🔍 Location-Based Donor Search

Search for approved blood donors near your location by blood type.

**Features:**
- 🎯 Select blood type
- 📍 Enable location access
- 📏 Set search radius (5-50 km)
- 📊 View donors sorted by distance
- 📞 Direct contact information

**Search Results Include:**
- Donor name & contact
- Blood type with badge
- Distance from your location
- Email & phone
- Age and last donation date
- Contact button

---

### 4. 🗺️ Location + Blood Type Filter ⭐

The key feature: **Search by Blood Type AND Location**

Example:
- User searches for **B+ blood type**
- User enables location (e.g., 28.6315, 77.2167)
- System shows only **B+ donors near that location**
- Results sorted by **closest distance first**
- Shows distance in kilometers

---

## 📁 New Components

### Frontend (React)

```
src/components/
├── Navigation.js              # Top navigation bar
├── HomePage.js                # Home page with features
├── DonorSearch.js             # Search donors by location + blood type
├── DonorRegistration.js       # Donor registration form
├── AdminLogin.js              # Admin login page
└── AdminDashboard.js          # Admin management panel
```

### Backend (Express)

**New API Endpoints:**

**Admin Routes:**
- `POST /api/admin/login` - Admin login
- `GET /api/admin/donors/pending` - Get pending donors
- `GET /api/admin/donors?status=...` - Filter donors
- `PUT /api/admin/donors/:id/approve` - Approve donor
- `PUT /api/admin/donors/:id/reject` - Reject donor

**Donor Routes:**
- `POST /api/donors/register` - Register new donor
- `GET /api/donors/approved` - Get all approved donors
- `GET /api/donors/search?blood_type=B+&lat=...&lng=...&radius=10` - **Location search**
- `GET /api/donors/:id` - Get donor details

### Database (Supabase)

**New Tables:**
- `donors` - Registered blood donors with approval status
- `admin_users` - Admin accounts (with demo data)
- `approval_logs` - Track approval/rejection actions

---

## 🚀 How Features Work

### Donor Registration Flow

```
User → Registration Form → Validation → Database (status: pending)
                                          ↓
                      Admin Dashboard → Admin Reviews
                                          ↓
                      Admin Approves ← OR → Admin Rejects
                                          ↓
                      Status: Approved/Rejected
```

### Donor Search Flow

```
User → Enable Location → Select Blood Type → Search
                                          ↓
                      API: /api/donors/search
                      Filter: blood_type = 'B+' & status = 'approved'
                      Calculate: Distance from user location
                      Sort: By distance (ascending)
                                          ↓
                      Display Results (nearest first)
```

### Admin Approval Flow

```
Pending Registration → Admin Login → Dashboard
                                      ↓
                      View Pending Donors
                                      ↓
                      Click Donor → View Details
                                      ↓
                      Approve OR Reject with Reason
                                      ↓
                      Database Updated → Status Changed
```

---

## 📊 Database Schema

### donors Table
```sql
id (Primary Key)
name (Text, Not Null)
email (Text, Unique, Not Null)
phone (Text, Not Null)
blood_type (Text, Not Null)
age (Integer)
city (Text, Not Null)
address (Text)
lat (Float, Not Null)           -- Latitude
lng (Float, Not Null)           -- Longitude
last_donation_date (Date)
status (Text) - pending/approved/rejected
approval_date (Timestamp)
rejection_reason (Text)
created_at (Timestamp)
updated_at (Timestamp)
```

### admin_users Table
```sql
id (Primary Key)
username (Text, Unique)
password (Text)                 -- Note: Hash in production!
email (Text, Unique)
full_name (Text)
role (Text) - admin/superadmin
is_active (Boolean)
created_at (Timestamp)
```

---

## 🔐 Security Notes

### Current State (Demo)
- ⚠️ Passwords stored in plain text (DEMO ONLY)
- ⚠️ Simple token-based auth
- ⚠️ No HTTPS enforcement

### Production Recommendations
- ✅ Use bcrypt for password hashing
- ✅ Implement JWT tokens with expiry
- ✅ Add HTTPS/SSL
- ✅ Add rate limiting
- ✅ Add request validation
- ✅ Implement proper authorization checks
- ✅ Add email verification for donors
- ✅ Add OTP for sensitive operations

---

## 🧪 Testing the Features

### Test Donor Registration
1. Go to "Register" page
2. Fill form with sample data
3. Click "Get My Current Location"
4. Submit form
5. See "Waiting for approval" message

### Test Admin Approval
1. **Login: admin / <set-in-your-env>**
2. Go to Admin Dashboard
3. See "Pending Approvals" count
4. Click on a donor
5. Click "Approve" button
6. Donor status changes

### Test Donor Search
1. Go to "Find Donors" page
2. Select blood type (e.g., B+)
3. Click "Get My Location"
4. Adjust radius (5-50 km)
5. Click "Search Donors"
6. See nearby approved donors sorted by distance

---

## 🎯 Feature Highlights

| Feature | Details |
|---------|---------|
| **Location Search** | Find donors with real geolocation calculation |
| **Blood Type Filter** | Filter by all 8 blood types (A+, A-, B+, B-, AB+, AB-, O+, O-) |
| **Distance Sorting** | Results automatically sorted by closest distance |
| **Admin Approval** | All new donors require admin verification |
| **Status Tracking** | Pending → Approved/Rejected workflow |
| **Contact Info** | Direct phone & email contact for donors |
| **Responsive UI** | Works on mobile, tablet, desktop |
| **Real-time Distance** | Calculates using Haversine formula |

---

## 🚨 Common Issues & Solutions

### Issue: Location not working
**Solution:** Ensure HTTPS or localhost, grant browser permission

### Issue: Search returns no results
**Solution:** 
- Check if donors are approved
- Increase search radius
- Verify blood type spelling

### Issue: Admin login fails
**Solution:**
- Use credentials: admin / <set-in-your-env>
- Check username spelling (lowercase)
- Clear browser cache

### Issue: Donor registration in pending state
**Solution:**
- Normal behavior - admin must approve
- Check admin dashboard to approve

---

## 📈 Future Enhancements

- [ ] Email notifications on approval/rejection
- [ ] SMS notifications
- [ ] Donation history tracking
- [ ] Donor availability calendar
- [ ] Hospital request system
- [ ] Blood bank integration
- [ ] Appointment booking
- [ ] Donation records & certificates
- [ ] Analytics dashboard
- [ ] Real-time inventory sync

---

## 🤝 Support

For issues or questions:
1. Check `API_DOCUMENTATION.md` for API details
2. Review SQL schema in `backend/sql-queries.sql`
3. Check component code in `frontend/src/components/`

**Happy donor matching! 🩸**
