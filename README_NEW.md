# 🩸 Blood Bank Management System (BBMS)

A modern web-based platform for managing blood donations, donor registration, admin approvals, and location-based donor search.

## ✨ New & Enhanced Features

### 🆕 Donor Registration & Approval
- Users can register as blood donors
- Admin approval workflow required
- Status tracking: pending → approved/rejected

### 🆕 Admin Panel
- Secure login with demo credentials
- Real-time dashboard statistics
- Approve/reject donor registrations
- Filter donors by status

### 🆕 Location-Based Donor Search ⭐
- Find blood donors by type AND location
- Geolocation integration
- Distance-based sorting (closest first)
- Configurable search radius

### Original Features
- 🔍 Blood bank search by type
- 📍 Geolocation support
- 📊 Real-time inventory
- 📱 Fully responsive

## 🚀 Quick Start

### 1. Setup Database
Run SQL from [SETUP_GUIDE_UPDATED.md](SETUP_GUIDE_UPDATED.md)

### 2. Backend
```bash
cd backend
npm install
# Create .env with Supabase credentials
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm start
```

**App opens at http://localhost:3000**

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP_GUIDE_UPDATED.md](SETUP_GUIDE_UPDATED.md) | Complete setup with SQL |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | All endpoints & examples |
| [FEATURES.md](FEATURES.md) | Feature overview |
| [WHAT_CHANGED.md](WHAT_CHANGED.md) | New features summary |

## 🔐 Demo Credentials

```
Admin Login:
Username: admin
Password: <set-in-your-env>
```

## 🌍 Key Feature: Location + Blood Type Search

Search nearby donors by blood type within specified radius:

```
User Location: 28.6315, 77.2167
Search: B+ within 10 km
Result: 3 donors (closest first)
  • Rahul Kumar (0.25 km)
  • Priya Singh (0.50 km)  
  • Amit Sharma (2.15 km)
```

## 📁 Project Structure

```
donor/
├── frontend/                React App
│   ├── src/components/
│   │   ├── HomePage.js
│   │   ├── DonorRegistration.js   NEW
│   │   ├── DonorSearch.js         NEW ⭐
│   │   ├── AdminLogin.js          NEW
│   │   ├── AdminDashboard.js      NEW
│   │   └── ... (other components)
│   └── ...
├── backend/                 Express API
│   ├── server.js
│   └── ...
├── API_DOCUMENTATION.md
├── FEATURES.md
├── SETUP_GUIDE_UPDATED.md
└── WHAT_CHANGED.md
```

## 🔌 API Endpoints

**New Donor API:**
```
POST   /api/donors/register              Register donor
GET    /api/donors/search                Search by location + blood type ⭐
GET    /api/donors/approved              Get all approved donors
```

**New Admin API:**
```
POST   /api/admin/login                  Admin login
GET    /api/admin/donors/pending         Get pending approvals
PUT    /api/admin/donors/:id/approve     Approve donor
PUT    /api/admin/donors/:id/reject      Reject donor
```

**Original Blood Bank API:**
```
GET    /api/blood-banks                  All banks
GET    /api/blood-banks/:id              Specific bank
POST   /api/blood-banks                  Add bank
PUT    /api/blood-banks/:id              Update bank
DELETE /api/blood-banks/:id              Delete bank
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete reference.

## 🧪 Test the Features

### Register as Donor
1. Click "Register" → Fill form → Get location → Submit
2. See "Waiting for approval" message

### Admin Approval
1. Click "Admin" → Login (admin/<set-in-your-env>)
2. See pending donors → Click → Approve/Reject

### Search Nearby Donors
1. Click "Find Donors"
2. Select blood type → Get location → Search
3. See results sorted by distance

## 💾 Database

**6 Tables:**
- blood_banks (original)
- requests (original)
- donations (original)
- **donors** (NEW)
- **admin_users** (NEW)
- **approval_logs** (NEW)

## 🎨 Tech Stack

- **Frontend:** React 18, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** Supabase PostgreSQL
- **Geolocation:** HTML5 + Haversine formula

## 🔒 Admin Credentials

```
Primary Account:
  Username: admin
  Password: <set-in-your-env>

Secondary Account:
  Username: superadmin
  Password: <set-in-your-env>
```

## 🎯 Features Comparison

| Feature | Before | After |
|---------|--------|-------|
| Blood bank search | ✅ | ✅ |
| Donor registration | ❌ | ✅ NEW |
| Admin approval | ❌ | ✅ NEW |
| Location search (donors) | ❌ | ✅ NEW |
| Distance sorting | Manual | ✅ Auto |
| Admin dashboard | ❌ | ✅ NEW |

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy 'build' folder
```

### Backend (Heroku/Railway)
```bash
npm install
# Set environment variables
git push heroku main
```

## 🛠️ Tech Details

- **Distance Calculation:** Haversine formula
- **UI Framework:** Tailwind CSS
- **HTTP Client:** Axios
- **Authentication:** Bearer token (demo)
- **Database:** Supabase (PostgreSQL)

## 🐛 Troubleshooting

**Port 5000 in use?**
- Change in backend/.env to 5001
- Update frontend API_URL

**CORS error?**
- Check API_URL matches backend port
- Restart both servers

**Geolocation not working?**
- Use localhost, not 127.0.0.1
- Grant browser permission

**Admin login fails?**
- Username: admin (lowercase)
- Password: <set-in-your-env>
- Check Supabase credentials

See [SETUP_GUIDE_UPDATED.md](SETUP_GUIDE_UPDATED.md) for more help.

## 📖 Getting Help

- Setup: [SETUP_GUIDE_UPDATED.md](SETUP_GUIDE_UPDATED.md)
- API: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Features: [FEATURES.md](FEATURES.md)
- Changes: [WHAT_CHANGED.md](WHAT_CHANGED.md)

## 📄 License

MIT License - Free and open source

---

## 🎯 Next Steps

1. 📖 Read [SETUP_GUIDE_UPDATED.md](SETUP_GUIDE_UPDATED.md)
2. 🗄️ Run the SQL schema
3. 🚀 Start backend & frontend
4. 🧪 Test all features
5. 🎨 Customize as needed

**Start with SETUP_GUIDE_UPDATED.md!** 👇

---

**Made with ❤️ to save lives through blood donations** 🩸
