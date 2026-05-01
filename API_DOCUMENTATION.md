## Enhanced API Documentation

### Admin Routes

#### 1. Admin Login
```
POST /api/admin/login
Content-Type: application/json

Body:
{
  "username": "admin",
  "password": "<set-in-your-env>"
}

Response (201):
{
  "success": true,
  "token": "{token}",
  "admin": {
    "id": 1,
    "username": "admin",
    "email": "admin@bloodbank.com",
    "full_name": "Admin User",
    "role": "admin"
  }
}
```

#### 2. Get Pending Donors (Admin Only)
```
GET /api/admin/donors/pending
Authorization: Bearer {token}

Response (200):
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "blood_type": "B+",
    "age": 28,
    "city": "Delhi",
    "address": "123 Main St",
    "lat": 28.6315,
    "lng": 77.2167,
    "status": "pending",
    "created_at": "2026-04-15T10:30:00Z"
  }
]
```

#### 3. Get All Donors (Admin) - With Filter
```
GET /api/admin/donors?status=approved
GET /api/admin/donors?status=pending
GET /api/admin/donors?status=rejected
Authorization: Bearer {token}

Response (200): Array of donors
```

#### 4. Approve Donor (Admin)
```
PUT /api/admin/donors/:id/approve
Authorization: Bearer {token}

Response (200):
{
  "message": "Donor approved successfully",
  "donor": {
    "id": 1,
    "status": "approved",
    "approval_date": "2026-04-15T10:35:00Z"
  }
}
```

#### 5. Reject Donor (Admin)
```
PUT /api/admin/donors/:id/reject
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "reason": "Health issues"
}

Response (200):
{
  "message": "Donor rejected successfully",
  "donor": {
    "id": 1,
    "status": "rejected",
    "rejection_reason": "Health issues"
  }
}
```

---

### Donor Routes

#### 1. Register as Donor
```
POST /api/donors/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "blood_type": "B+",
  "age": 28,
  "city": "Delhi",
  "address": "123 Main St, Apt 5",
  "lat": 28.6315,
  "lng": 77.2167
}

Response (201):
{
  "message": "Registration submitted. Waiting for admin approval.",
  "donor": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "blood_type": "B+",
    "age": 28,
    "city": "Delhi",
    "address": "123 Main St, Apt 5",
    "lat": 28.6315,
    "lng": 77.2167,
    "status": "pending",
    "created_at": "2026-04-15T10:30:00Z"
  }
}
```

#### 2. Get All Approved Donors
```
GET /api/donors/approved

Response (200):
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "blood_type": "B+",
    "age": 28,
    "city": "Delhi",
    "lat": 28.6315,
    "lng": 77.2167,
    "status": "approved",
    "approval_date": "2026-04-15T10:35:00Z"
  }
]
```

#### 3. Search Nearby Donors (Location + Blood Type) ⭐
```
GET /api/donors/search?blood_type=B+&lat=28.6315&lng=77.2167&radius=10

Query Parameters:
- blood_type (required): A+, A-, B+, B-, AB+, AB-, O+, O-
- lat (required): Your latitude
- lng (required): Your longitude
- radius (optional): Search radius in km (default: 10)

Response (200):
{
  "count": 3,
  "blood_type": "B+",
  "radius_km": 10,
  "donors": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 98765 43210",
      "blood_type": "B+",
      "age": 28,
      "city": "Delhi",
      "lat": 28.6315,
      "lng": 77.2167,
      "distance": 0.25,
      "status": "approved",
      "last_donation_date": "2026-02-15"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+91 98765 43211",
      "blood_type": "B+",
      "age": 32,
      "city": "Delhi",
      "lat": 28.6320,
      "lng": 77.2170,
      "distance": 0.50,
      "status": "approved",
      "last_donation_date": "2026-03-20"
    }
  ]
}
```

#### 4. Get Donor By ID
```
GET /api/donors/:id

Response (200):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "blood_type": "B+",
  "age": 28,
  "city": "Delhi",
  "address": "123 Main St",
  "lat": 28.6315,
  "lng": 77.2167,
  "status": "approved"
}
```

---

### Admin Credentials (Demo)

**Username:** `admin`  
**Password:** `<set-in-your-env>`

Alternative:  
**Username:** `superadmin`  
**Password:** `<set-in-your-env>`

---

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

#### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

#### 404 Not Found
```json
{
  "error": "Donor not found"
}
```

#### 500 Server Error
```json
{
  "error": "Failed to fetch donors"
}
```

---

### Testing with cURL

```bash
# Admin Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"<set-in-your-env>"}'

# Get Pending Donors
curl -X GET http://localhost:5000/api/admin/donors/pending \
  -H "Authorization: Bearer {token}"

# Register as Donor
curl -X POST http://localhost:5000/api/donors/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "blood_type": "B+",
    "age": 28,
    "city": "Delhi",
    "address": "123 Main St",
    "lat": 28.6315,
    "lng": 77.2167
  }'

# Search Nearby Donors
curl -X GET "http://localhost:5000/api/donors/search?blood_type=B+&lat=28.6315&lng=77.2167&radius=10"

# Approve Donor
curl -X PUT http://localhost:5000/api/admin/donors/1/approve \
  -H "Authorization: Bearer {token}"

# Reject Donor
curl -X PUT http://localhost:5000/api/admin/donors/2/reject \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Health issues"}'
```

---

### JavaScript/Fetch Examples

```javascript
// Admin Login
async function adminLogin() {
  const response = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'admin',
      password: '<set-in-your-env>'
    })
  });
  return await response.json();
}

// Register Donor
async function registerDonor(donorData) {
  const response = await fetch('http://localhost:5000/api/donors/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donorData)
  });
  return await response.json();
}

// Search Nearby Donors
async function searchDonors(bloodType, lat, lng, radius = 10) {
  const url = new URL('http://localhost:5000/api/donors/search');
  url.searchParams.append('blood_type', bloodType);
  url.searchParams.append('lat', lat);
  url.searchParams.append('lng', lng);
  url.searchParams.append('radius', radius);

  const response = await fetch(url);
  return await response.json();
}

// Approve Donor (Admin)
async function approveDonor(donorId, token) {
  const response = await fetch(`http://localhost:5000/api/admin/donors/${donorId}/approve`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

// Reject Donor (Admin)
async function rejectDonor(donorId, reason, token) {
  const response = await fetch(`http://localhost:5000/api/admin/donors/${donorId}/reject`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reason })
  });
  return await response.json();
}
```
