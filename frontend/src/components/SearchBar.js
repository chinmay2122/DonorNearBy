import React, { useState } from 'react';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SearchBar = ({ onSearch, onLocationSearch }) => {
  const [selectedBloodType, setSelectedBloodType] = useState('');

  const handleBloodTypeChange = (e) => {
    const bloodType = e.target.value;
    setSelectedBloodType(bloodType);
    onSearch(bloodType || 'all');
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSearch(latitude, longitude);
          alert(`Your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-[#961414]/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#3a1a1a] font-semibold mb-2">Blood Type</label>
          <select
            value={selectedBloodType}
            onChange={handleBloodTypeChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000] transition"
          >
            <option value="">-- Select Blood Type --</option>
            <option value="all">All Blood Types</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleLocationClick}
            className="w-full gradient-primary text-white font-bold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            📍 Use My Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
