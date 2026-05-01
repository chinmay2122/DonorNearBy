import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ onNavigate }) => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const [overview, setOverview] = useState({
    registered_donors: 0,
    blood_centers: 0,
    upcoming_camps: 0,
    camps_organised: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    const fetchOverview = async () => {
      setStatsLoading(true);
      setStatsError('');

      try {
        const response = await axios.get(`${API_URL}/stats/overview`);
        setOverview(response.data || {});
      } catch (err) {
        setStatsError('Unable to load live stats right now');
      } finally {
        setStatsLoading(false);
      }
    };

    fetchOverview();
  }, [API_URL]);

  const formatIndianNumber = (value) => Number(value || 0).toLocaleString('en-IN');

  const statCards = [
    { label: 'Registered Donors', value: overview.registered_donors },
    { label: 'Blood Centers', value: overview.blood_centers },
    { label: 'Upcoming Camps', value: overview.upcoming_camps },
    { label: 'Camps Organised', value: overview.camps_organised },
  ];

  return (
    <div className="min-h-screen bg-[#f4bcc4]">
      {/* Hero Section */}
      <div className="gradient-primary container-custom py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">🩸 Save Lives</h1>
        <p className="text-2xl mb-8 opacity-90">Find blood donors or become one today</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => onNavigate('search')}
            className="bg-[#f4bcc4] text-[#711220] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition transform hover:scale-105"
          >
            🔍 Find Donors
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="bg-[#711220] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition transform hover:scale-105"
          >
            💪 Become a Donor
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#f4bcc4] py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#711220]">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2 text-[#711220]">Find Nearby Donors</h3>
              <p className="text-[#6f5045]">
                Search for blood donors near your location with specific blood types
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2 text-[#711220]">Easy Registration</h3>
              <p className="text-[#6f5045]">
                Register as a donor in minutes. Get approved by our admin team
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-[#711220]">Real-Time Updates</h3>
              <p className="text-[#6f5045]">
                Get instant notifications about donor approvals and requests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nationwide Presence */}
      <div className="bg-white py-16">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-4xl font-bold text-[#711220] mb-3">Nationwide Presence</h2>
            <p className="text-xl text-[#6f5045] font-semibold mb-3">Ensuring Accessibility Across India</p>
            <p className="text-[#6f5045] mb-8">A connected network of donors and blood centers serving every region.</p>

            {statsError && (
              <div className="mb-4 text-sm rounded-lg bg-[#f4bcc4] border border-[#a08674]/35 text-[#711220] px-4 py-2">
                {statsError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statCards.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white border border-[#c1b3bc] p-5">
                  <p className="text-sm text-[#6f5045]">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#db233e] mt-2">
                    {statsLoading ? '...' : formatIndianNumber(stat.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#c1b3bc] bg-[#c1b3bc] p-4 min-h-[360px] flex items-center justify-center overflow-hidden">
            <img
              src="/nationwide-blood.png"
              alt="Hands holding a red medical heart"
              className="w-full h-full min-h-[340px] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-[#f4bcc4] py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-[#711220] mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="group rounded-xl bg-white border border-[#c1b3bc] p-6 transition-all duration-300 hover:bg-[#db233e] hover:border-[#711220] hover:text-white hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl mb-3">🔎</p>
              <h3 className="text-xl font-bold mb-2 text-[#711220] group-hover:text-white">Blood Availability Search</h3>
              <p className="text-sm text-[#6f5045] group-hover:text-white/90">Check blood stock, donor matches and nearby centers in one place.</p>
            </div>
            <div className="group rounded-xl bg-white border border-[#c1b3bc] p-6 transition-all duration-300 hover:bg-[#db233e] hover:border-[#711220] hover:text-white hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl mb-3">🏥</p>
              <h3 className="text-xl font-bold text-[#711220] mb-2 group-hover:text-white">Blood Center Directory</h3>
              <p className="text-sm text-[#6f5045] group-hover:text-white/90">Browse blood centers with distance, contact details and inventory.</p>
            </div>
            <div className="group rounded-xl bg-white border border-[#c1b3bc] p-6 transition-all duration-300 hover:bg-[#db233e] hover:border-[#711220] hover:text-white hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl mb-3">🩸</p>
              <h3 className="text-xl font-bold text-[#711220] mb-2 group-hover:text-white">Donation Camps</h3>
              <p className="text-sm text-[#6f5045] group-hover:text-white/90">Track camps and events to donate blood and support the community.</p>
            </div>
            <div className="group rounded-xl bg-white border border-[#c1b3bc] p-6 transition-all duration-300 hover:bg-[#db233e] hover:border-[#711220] hover:text-white hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl mb-3">📱</p>
              <h3 className="text-xl font-bold text-[#711220] mb-2 group-hover:text-white">Rapid Contact</h3>
              <p className="text-sm text-[#6f5045] group-hover:text-white/90">Call nearby donors or blood centers instantly from results.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="gradient-primary text-white py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur">
              <div className="text-4xl font-bold mb-4">1️⃣</div>
              <h3 className="text-xl font-bold mb-2">Register</h3>
              <p className="opacity-90">
                Fill out the registration form with your details and blood type
              </p>
            </div>
            
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur">
              <div className="text-4xl font-bold mb-4">2️⃣</div>
              <h3 className="text-xl font-bold mb-2">Wait for Approval</h3>
              <p className="opacity-90">
                Admin team reviews your information and approves your profile
              </p>
            </div>
            
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur">
              <div className="text-4xl font-bold mb-4">3️⃣</div>
              <h3 className="text-xl font-bold mb-2">Help Others</h3>
              <p className="opacity-90">
                Get discovered by people searching for your blood type
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#f4bcc4] py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#711220]">Ready to Save Lives?</h2>
          <p className="text-xl text-[#6f5045] mb-8">
            Join our community of donors and help those in need
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="gradient-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition transform hover:scale-105"
          >
            Register as Donor Now 💪
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#6f5045] text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact</h3>
              <p className="text-sm font-semibold text-white/90 mb-1">Address:</p>
              <p className="text-white/85 leading-relaxed">
                Presidency University, Itgalpura, Rajanukunte, Yelahanka, Bengaluru - 560064
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Reach Us</h3>
              <p className="text-sm font-semibold text-white/90 mb-1">Contact Number</p>
              <a href="tel:+919353536749" className="text-white/85 hover:text-white transition block mb-4">
                +91-9353536749
              </a>

              <p className="text-sm font-semibold text-white/90 mb-1">Email</p>
              <a href="mailto:Support@donornearby.org" className="text-white/85 hover:text-white transition">
                Support@donornearby.org
              </a>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">For Administrative Queries</h3>
              <p className="text-white/85 leading-relaxed">
                Presidency University, Itgalpura, Rajanukunte, Yelahanka, Bengaluru - 560064
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold text-white/90 mb-3">Connect With Us</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/chinmaysganiga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center hover:bg-[#db233e] hover:border-[#db233e] transition"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.75a4 4 0 0 0-4 4v8.5a4 4 0 0 0 4 4h8.5a4 4 0 0 0 4-4v-8.5a4 4 0 0 0-4-4h-8.5zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5z" />
                    </svg>
                  </a>

                  <a
                    href="mailto:Support@donornearby.org"
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center hover:bg-[#db233e] hover:border-[#db233e] transition"
                    aria-label="Email"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13zm2.2-.75L12 10.2l6.8-5.45H5.2zM19.25 6.1l-5.52 4.42a2.75 2.75 0 0 1-3.46 0L4.75 6.1v12.4a.75.75 0 0 0 .75.75h13a.75.75 0 0 0 .75-.75V6.1z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/donor-nearby/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center hover:bg-[#db233e] hover:border-[#db233e] transition"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                      <path d="M6.2 8.2a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM4.4 9.8H8v9.8H4.4V9.8zm5.6 0h3.4v1.3h.1c.5-.9 1.7-1.8 3.5-1.8 3.8 0 4.5 2.3 4.5 5.3v5h-3.6v-4.4c0-1.1 0-2.4-1.6-2.4s-1.9 1.2-1.9 2.3v4.5H10V9.8z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 text-center text-white/80">
            <p>&copy; 2026 DonorNearBy. All rights reserved. 🩸</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
