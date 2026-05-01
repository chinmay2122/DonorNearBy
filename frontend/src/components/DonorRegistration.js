import React, { useState } from 'react';
import axios from 'axios';

const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    blood_type: '',
    age: '',
    city: '',
    address: '',
    lat: '',
    lng: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            lat: latitude.toFixed(6),
            lng: longitude.toFixed(6),
          }));
          setError(null);
          setLoading(false);
        },
        (error) => {
          setError('Unable to get location. Please enable location access.');
          setLoading(false);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.blood_type || !formData.city || !formData.lat || !formData.lng) {
        setError('Please fill all required fields');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/donors/register`, formData);
      
      setMessage('✅ Registration submitted! Waiting for admin approval.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        blood_type: '',
        age: '',
        city: '',
        address: '',
        lat: '',
        lng: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 border border-[#961414]/15">
        <h2 className="text-3xl font-bold text-[#3a1a1a] mb-2 text-center">🩸 Become a Donor</h2>
        <p className="text-[#961414] text-center mb-8">Register to help save lives. Admin will approve your registration.</p>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-[#3a1a1a] font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#3a1a1a] font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#3a1a1a] font-semibold mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
                required
              />
            </div>

            {/* Blood Type */}
            <div>
              <label className="block text-[#3a1a1a] font-semibold mb-2">Blood Type *</label>
              <select
                name="blood_type"
                value={formData.blood_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
                required
              >
                <option value="">-- Select Blood Type --</option>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-[#3a1a1a] font-semibold mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
                min="18"
                max="65"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-[#3a1a1a] font-semibold mb-2">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Delhi"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[#3a1a1a] font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address, apartment, etc."
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
            />
          </div>

          {/* Location */}
            <div className="bg-[#f2f2f2] p-4 rounded-lg border-2 border-[#961414]/20">
              <h3 className="font-semibold text-[#3a1a1a] mb-3">📍 Location (Required)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="block text-[#3a1a1a] font-semibold mb-2">Latitude *</label>
                <input
                  type="number"
                  name="lat"
                  value={formData.lat}
                  onChange={handleChange}
                  placeholder="28.6315"
                  step="0.0001"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
                  required
                />
              </div>
              <div>
                  <label className="block text-[#3a1a1a] font-semibold mb-2">Longitude *</label>
                <input
                  type="number"
                  name="lng"
                  value={formData.lng}
                  onChange={handleChange}
                  placeholder="77.2167"
                  step="0.0001"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={loading}
                className="mt-3 w-full gradient-primary text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
            >
              📍 Get My Current Location
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
              className="w-full gradient-primary text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : '✅ Register as Donor'}
          </button>
        </form>

          <p className="text-sm text-[#961414] text-center mt-6">
          Your information will be reviewed by an admin. You'll be notified once approved.
        </p>
      </div>
    </div>
  );
};

export default DonorRegistration;
