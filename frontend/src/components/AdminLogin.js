import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        username,
        password,
      });

      const { token, admin } = response.data;
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(admin));
      
      onLoginSuccess(admin, token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 border border-[#961414]/15">
        <h1 className="text-3xl font-bold text-center text-[#3a1a1a] mb-2">🔒 Admin Login</h1>
        <p className="text-[#961414] text-center mb-8">Access the admin dashboard</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#3a1a1a] font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
              required
            />
          </div>

          <div>
            <label className="block text-[#3a1a1a] font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : '🔓 Login'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-[#f2f2f2] border-2 border-[#961414]/20 rounded-lg">
          <p className="text-sm font-semibold text-[#3a1a1a] mb-2">Credentials</p>
          <p className="text-xs text-[#961414]">Use your configured admin username and password.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
