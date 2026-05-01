import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ admin, token, onLogout }) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetchDonors();
  }, [filter]);

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/admin/donors?status=${filter}`, { headers });
      setDonors(response.data);
    } catch (err) {
      setError('Failed to load donors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (donorId) => {
    try {
      await axios.put(`${API_URL}/admin/donors/${donorId}/approve`, {}, { headers });
      fetchDonors();
      setSelectedDonor(null);
      alert('✅ Donor approved successfully!');
    } catch (err) {
      alert('Error approving donor');
    }
  };

  const handleReject = async (donorId) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    try {
      await axios.put(
        `${API_URL}/admin/donors/${donorId}/reject`,
        { reason: rejectionReason },
        { headers }
      );
      fetchDonors();
      setSelectedDonor(null);
      setRejectionReason('');
      alert('❌ Donor rejected successfully!');
    } catch (err) {
      alert('Error rejecting donor');
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 border border-[#961414]/15">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#3a1a1a]">👑 Admin Dashboard</h1>
              <p className="text-[#961414]">Welcome, {admin.full_name || admin.username}</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-[#a30000] hover:bg-[#961414] text-white font-bold py-2 px-6 rounded-lg transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-2 border-[#961414]/20 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-[#961414]">
              {donors.filter((d) => d.status === 'pending').length}
            </p>
            <p className="text-[#3a1a1a] font-semibold">Pending Approvals</p>
          </div>
          <div className="bg-white border-2 border-[#961414]/20 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-[#a30000]">
              {donors.filter((d) => d.status === 'approved').length}
            </p>
            <p className="text-[#3a1a1a] font-semibold">Approved Donors</p>
          </div>
          <div className="bg-white border-2 border-[#961414]/20 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-[#3a1a1a]">
              {donors.filter((d) => d.status === 'rejected').length}
            </p>
            <p className="text-[#3a1a1a] font-semibold">Rejected Donors</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  filter === status
                    ? 'bg-[#a30000] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Donors Table */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30000]"></div>
              <p className="text-[#961414] mt-4">Loading donors...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-[#a30000]">{error}</div>
          ) : donors.length === 0 ? (
            <div className="p-8 text-center text-[#961414]">No donors found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="gradient-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-left">Blood Type</th>
                    <th className="px-6 py-3 text-left">City</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((donor) => (
                    <tr key={donor.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold">{donor.name}</td>
                      <td className="px-6 py-4">{donor.email}</td>
                      <td className="px-6 py-4">{donor.phone}</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#f2f2f2] text-[#a30000] px-3 py-1 rounded-full text-sm font-semibold border border-[#c91c1c]/30">
                          {donor.blood_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">{donor.city}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            donor.status === 'pending'
                              ? 'bg-[#f2f2f2] text-[#961414]'
                              : donor.status === 'approved'
                              ? 'bg-[#f2f2f2] text-[#3a1a1a]'
                              : 'bg-[#f2f2f2] text-[#a30000]'
                          }`}
                        >
                          {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedDonor(donor)}
                          className="bg-[#a30000] hover:bg-[#961414] text-white px-3 py-1 rounded-lg text-sm font-semibold transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 border border-[#961414]/15">
            <h2 className="text-2xl font-bold text-[#3a1a1a] mb-6">Donor Details</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-[#961414] text-sm">Name</p>
                <p className="text-lg font-semibold">{selectedDonor.name}</p>
              </div>
              <div>
                <p className="text-[#961414] text-sm">Blood Type</p>
                <p className="text-lg font-semibold text-[#a30000]">{selectedDonor.blood_type}</p>
              </div>
              <div>
                <p className="text-[#961414] text-sm">Email</p>
                <p className="text-lg">{selectedDonor.email}</p>
              </div>
              <div>
                <p className="text-[#961414] text-sm">Phone</p>
                <p className="text-lg">{selectedDonor.phone}</p>
              </div>
              <div>
                <p className="text-[#961414] text-sm">Age</p>
                <p className="text-lg">{selectedDonor.age || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[#961414] text-sm">City</p>
                <p className="text-lg">{selectedDonor.city}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[#961414] text-sm">Address</p>
                <p className="text-lg">{selectedDonor.address || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[#961414] text-sm">Location (Lat, Lng)</p>
                <p className="text-lg">
                  {selectedDonor.lat.toFixed(4)}, {selectedDonor.lng.toFixed(4)}
                </p>
              </div>
            </div>

            {selectedDonor.status === 'pending' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Rejection Reason (if rejecting)
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Health issues, incomplete documents, etc."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#a30000]"
                    rows="3"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(selectedDonor.id)}
                    className="flex-1 bg-[#3a1a1a] hover:bg-[#961414] text-white font-bold py-3 rounded-lg transition"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedDonor.id)}
                    className="flex-1 bg-[#a30000] hover:bg-[#961414] text-white font-bold py-3 rounded-lg transition"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            )}

            {selectedDonor.status === 'rejected' && selectedDonor.rejection_reason && (
              <div className="bg-[#f2f2f2] border-2 border-[#961414]/20 rounded-lg p-4">
                <p className="text-[#3a1a1a] font-semibold">Rejection Reason:</p>
                <p className="text-[#a30000]">{selectedDonor.rejection_reason}</p>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedDonor(null);
                setRejectionReason('');
              }}
              className="w-full mt-6 bg-[#3a1a1a] hover:bg-[#961414] text-white font-bold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
