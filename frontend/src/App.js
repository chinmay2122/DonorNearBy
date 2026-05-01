import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import DonorSearch from './components/DonorSearch';
import DonorRegistration from './components/DonorRegistration';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  // Check if admin is already logged in (from localStorage)
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedUser = localStorage.getItem('adminUser');
    if (savedToken && savedUser) {
      setAdminToken(savedToken);
      setAdminUser(JSON.parse(savedUser));
      setCurrentPage('admin');
    }
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleAdminLoginSuccess = (admin, token) => {
    setAdminUser(admin);
    setAdminToken(token);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setAdminToken(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Routes */}
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}

      {currentPage === 'search' && <DonorSearch />}

      {currentPage === 'register' && <DonorRegistration />}

      {currentPage === 'admin' && !adminUser && (
        <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
      )}

      {currentPage === 'admin' && adminUser && (
        <AdminDashboard
          admin={adminUser}
          token={adminToken}
          onLogout={handleAdminLogout}
        />
      )}
    </div>
  );
}

export default App;
