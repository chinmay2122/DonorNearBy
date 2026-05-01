<<<<<<< HEAD
# Blood Bank Management System

A modern web-based platform for managing blood donations, hospital requests, and inventory tracking.

## Features

- 🔍 **Blood Type Search**: Find available blood types instantly
- 📍 **Location-Based Search**: Discover nearest blood banks using geolocation
- 📊 **Real-Time Inventory**: Check blood supply availability at multiple banks
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean, intuitive interface built with React and Tailwind CSS

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Axios for API calls
- Modern ES6+ JavaScript

### Backend
- Node.js
- Express.js
- Supabase (PostgreSQL database)
- CORS enabled for cross-origin requests

## Project Structure

```
donor/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── SearchBar.js
│   │   │   ├── BloodBankList.js
│   │   │   └── BloodBankCard.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_api_key
PORT=5000
```

To get your Supabase credentials:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API to find your URL and API keys

**Create Supabase Table**:

Run this SQL in your Supabase SQL editor:

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
```

Start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Blood Banks
- `GET /api/blood-banks` - Get all blood banks
- `GET /api/blood-banks/:id` - Get specific blood bank
- `POST /api/blood-banks` - Add new blood bank
- `PUT /api/blood-banks/:id` - Update blood bank details
- `PUT /api/blood-banks/:id/inventory` - Update inventory
- `DELETE /api/blood-banks/:id` - Delete blood bank

### Search
- `GET /api/search?bloodType=A+` - Search by blood type

## Sample Data

Insert sample blood banks into Supabase:

```sql
INSERT INTO blood_banks (name, address, city, phone, latitude, longitude, hours, inventory) VALUES
('City Blood Bank', '123 Main St', 'New York', '+1-555-0101', 40.7128, -74.0060, '24/7', '{"A+": 50, "A-": 30, "B+": 45, "B-": 25, "AB+": 20, "AB-": 15, "O+": 60, "O-": 40}'),
('Central Hospital Blood Bank', '456 Park Ave', 'New York', '+1-555-0102', 40.7580, -73.9855, '8am-8pm', '{"A+": 35, "A-": 20, "B+": 30, "B-": 18, "AB+": 12, "AB-": 10, "O+": 45, "O-": 30}'),
('Metro Blood Services', '789 5th Ave', 'New York', '+1-555-0103', 40.7614, -73.9776, '24/7', '{"A+": 55, "A-": 35, "B+": 50, "B-": 28, "AB+": 22, "AB-": 18, "O+": 65, "O-": 45}');
```

## Features Walkthrough

### 1. Search by Blood Type
- Select a blood type from the dropdown
- View all blood banks that have that blood type available
- See inventory levels and stock status

### 2. Location-Based Search
- Click "Use My Location" button
- Grant permission to access your location
- Blood banks are sorted by distance from your location
- See exact distance in kilometers

### 3. Blood Bank Details
- View bank name, address, and city
- Contact information with clickable phone number
- Operating hours
- Complete blood inventory with stock status
- Color-coded blood type indicators

### 4. Stock Status
- **In Stock**: More than 5 units available
- **Low Stock**: Less than 5 units
- **Out of Stock**: No units available

## Future Enhancements

- User authentication and profiles
- Blood donation booking system
- Hospital request management
- Donation history tracking
- Push notifications
- Admin dashboard
- Real-time inventory updates using WebSockets

## Troubleshooting

### Port Already in Use
```bash
# Change port in backend .env file
PORT=5001
```

### CORS Issues
- Ensure backend is running on http://localhost:5000
- Check frontend .env has correct API_URL

### Supabase Connection
- Verify SUPABASE_URL and SUPABASE_KEY are correct
- Check internet connection
- Ensure your Supabase project is active

## License

MIT License - feel free to use this for educational and commercial purposes

---

**Made with ❤️ for the community**
=======
# DonorNearBy
Donor near by is a place where we can search for the blood donors / blood blanks near by , users can become a donor  etc simply its a market place for searching a blood donors 

