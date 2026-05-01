# Quick Start Guide for Blood Bank Management System

## Step 1: Supabase Setup (5 minutes)

1. Visit [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details and create
4. Wait for project to initialize
5. Go to **Settings → API** and copy:
   - **Project URL** → SUPABASE_URL
   - **anon public key** → SUPABASE_KEY

6. Go to **SQL Editor** and run:
```sql
CREATE TABLE blood_banks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  latitude FLOAT,
  longitude FLOAT,
  hours VARCHAR(50) DEFAULT '24/7',
  inventory JSONB DEFAULT '{"A+": 0, "A-": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "O+": 0, "O-": 0}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO blood_banks (name, address, city, phone, latitude, longitude, hours, inventory) VALUES
('City Blood Bank', '123 Main St', 'New York', '+1-555-0101', 40.7128, -74.0060, '24/7', '{"A+": 50, "A-": 30, "B+": 45, "B-": 25, "AB+": 20, "AB-": 15, "O+": 60, "O-": 40}'),
('Central Hospital Blood Bank', '456 Park Ave', 'New York', '+1-555-0102', 40.7580, -73.9855, '8am-8pm', '{"A+": 35, "A-": 20, "B+": 30, "B-": 18, "AB+": 12, "AB-": 10, "O+": 45, "O-": 30}'),
('Metro Blood Services', '789 5th Ave', 'New York', '+1-555-0103', 40.7614, -73.9776, '24/7', '{"A+": 55, "A-": 35, "B+": 50, "B-": 28, "AB+": 22, "AB-": 18, "O+": 65, "O-": 45}');
```

## Step 2: Backend Setup (3 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your Supabase credentials
echo "SUPABASE_URL=your_url_here" > .env
echo "SUPABASE_KEY=your_key_here" >> .env
echo "PORT=5000" >> .env

# Start development server
npm run dev
```

You should see: `🩸 Blood Bank API running on http://localhost:5000`

## Step 3: Frontend Setup (3 minutes)

```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start React development server
npm start
```

The app will automatically open at `http://localhost:3000`

## Step 4: Test the Application

### Test Blood Type Search:
1. Select "A+" from the dropdown
2. You should see 3 blood banks with A+ available

### Test Location-Based Search:
1. Click "📍 Use My Location"
2. Grant browser permission
3. Blood banks will sort by distance

### Test API Directly:
```bash
# In terminal, test the API:
curl http://localhost:5000/api/blood-banks
curl http://localhost:5000/api/search?bloodType=A+
```

## Troubleshooting

### Issue: "Cannot GET /api/blood-banks"
- ✅ Ensure backend is running on port 5000
- ✅ Check SUPABASE_URL and SUPABASE_KEY are correct

### Issue: "React app won't load"
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Restart React dev server

### Issue: "Location not working"
- ✅ Use HTTPS or localhost
- ✅ Grant browser location permission

### Issue: "Port 5000 already in use"
```bash
# Change PORT in backend/.env to 5001
# Update frontend/.env API_URL to http://localhost:5001/api
```

## Features Ready to Use

✅ Search blood by type  
✅ Location-based search  
✅ Real-time inventory view  
✅ Distance calculation  
✅ Responsive mobile UI  
✅ Modern design with Tailwind CSS  

## Next Steps

After setup, you can:
1. Add more blood banks in Supabase
2. Customize the UI colors/styling in `src/index.css`
3. Add donation booking feature
4. Implement hospital request system
5. Add user notifications

---

**Need help?** Check the main [README.md](./README.md) for more details.
