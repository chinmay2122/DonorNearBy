import React, { useState } from 'react';
import axios from 'axios';

const DonorSearch = () => {
  const [bloodType, setBloodType] = useState('');
  const [radiusKm] = useState(30);
  const [userLocation, setUserLocation] = useState(null);
  const [donors, setDonors] = useState([]);
  const [bloodCenters, setBloodCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleFindMyLocation = () => {
    setLocating(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: Number(position.coords.latitude.toFixed(6)),
          lng: Number(position.coords.longitude.toFixed(6)),
        });
        setLocating(false);
      },
      () => {
        setError('Unable to detect location. Please allow location access and try again.');
        setLocating(false);
      }
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDonors([]);
    setBloodCenters([]);
    setSearched(true);

    try {
      if (!bloodType || !userLocation) {
        setError('Please select blood type and click Find My Location first');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/donors/search`, {
        params: {
          blood_type: bloodType,
          lat: userLocation.lat,
          lng: userLocation.lng,
          radius: radiusKm,
        },
      });

      setDonors(response.data.donors || []);
      setBloodCenters(response.data.blood_centers || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3a1a1a] text-center mb-2">🔍 Find Nearby Donors</h1>
        <p className="text-[#961414] text-center mb-8">Auto-detect your location and find donors or blood centers within 30 km</p>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Blood Type Selection */}
            <div>
              <label className="block text-[#3a1a1a] font-semibold mb-2">Blood Type *</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
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

            {/* Location Text Search */}
            <div className="bg-[#f2f2f2] p-4 rounded-lg border border-[#961414]/25">
              <label className="block text-[#3a1a1a] font-semibold mb-2">Your Location *</label>
              {userLocation ? (
                <p className="text-[#3a1a1a] font-semibold">
                  ✅ Latitude: {userLocation.lat}, Longitude: {userLocation.lng}
                </p>
              ) : (
                <p className="text-[#961414] font-semibold">Location not captured yet</p>
              )}
              <p className="text-sm text-[#961414] mt-2">Search radius is fixed to {radiusKm} km.</p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleFindMyLocation}
                disabled={locating}
                className="bg-white border-2 border-[#a30000] text-[#a30000] font-bold py-3 rounded-lg hover:bg-[#f2f2f2] transition disabled:opacity-50"
              >
                {locating ? 'Locating...' : '📍 Find My Location'}
              </button>
              <button
                type="submit"
                disabled={loading || !bloodType || !userLocation}
                className="gradient-primary text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Searching...' : '🔍 Search Donors'}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div>
            <h2 className="text-2xl font-bold text-[#3a1a1a] mb-4">
              {loading
                ? '⏳ Searching...'
                : `Found ${donors.length} Donor${donors.length !== 1 ? 's' : ''} and ${bloodCenters.length} Blood Center${bloodCenters.length !== 1 ? 's' : ''}`}
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30000]"></div>
              </div>
            ) : donors.length === 0 && bloodCenters.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-2xl">😞 No results in 30 km range</p>
                <p className="text-gray-600">Try a different blood type or verify location permissions</p>
              </div>
            ) : (
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-bold text-[#3a1a1a] mb-4">Nearby Donors</h3>
                  {donors.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-5 text-[#961414]">No nearby donors found for this blood type.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {donors.map((donor) => (
                        <div
                          key={donor.id}
                          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-[#961414]/15"
                        >
                          <div className="gradient-primary text-white p-4">
                            <h3 className="text-xl font-bold">{donor.name}</h3>
                            <p className="text-sm opacity-90">{donor.city}</p>
                          </div>

                          <div className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                              <span className="inline-block bg-[#f2f2f2] text-[#a30000] px-4 py-2 rounded-full text-lg font-bold border border-[#c91c1c]/30">
                                {donor.blood_type}
                              </span>
                              <span className="text-sm font-semibold text-[#3a1a1a]">{donor.distance_km} km away</span>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-600">Address</p>
                                <p className="font-semibold text-[#a30000]">{donor.address || donor.city}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-semibold">{donor.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Phone</p>
                                <a href={`tel:${donor.phone}`} className="font-semibold text-[#a30000] hover:underline">
                                  {donor.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#3a1a1a] mb-4">Nearby Blood Centers / Camps</h3>
                  {bloodCenters.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-5 text-[#961414]">No nearby blood centers found in 30 km.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {bloodCenters.map((center) => (
                        <div key={center.id} className="bg-white rounded-lg shadow-lg border border-[#961414]/15 p-6">
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-[#3a1a1a]">{center.name}</h4>
                              <p className="text-sm text-[#961414]">{center.distance_km} km away</p>
                            </div>
                            <span className="inline-block bg-[#a30000] text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {center.blood_type}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold text-[#3a1a1a]">Quantity:</span> {center.available_units} units</p>
                            <p><span className="font-semibold text-[#3a1a1a]">Location:</span> {center.address}, {center.city}</p>
                            <p>
                              <span className="font-semibold text-[#3a1a1a]">Phone:</span>{' '}
                              <a href={`tel:${center.phone}`} className="text-[#a30000] hover:underline font-semibold">
                                {center.phone}
                              </a>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorSearch;
