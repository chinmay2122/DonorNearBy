import React from 'react';

const Navigation = ({ currentPage, onNavigate }) => {
  return (
    <nav className="gradient-primary text-white shadow-lg sticky top-0 z-40 border-b border-[#961414]">
      <div className="container-custom py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="DonorNearBy logo" className="w-10 h-10 rounded-full bg-[#f2f2f2] p-1" />
          <h1 className="text-2xl font-bold">DonorNearBy</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 'home' ? 'bg-[#f2f2f2] text-[#a30000]' : 'hover:bg-[#f2f2f2] hover:text-[#a30000]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('search')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 'search' ? 'bg-[#f2f2f2] text-[#a30000]' : 'hover:bg-[#f2f2f2] hover:text-[#a30000]'
            }`}
          >
            🔍 Find Donors
          </button>
          <button
            onClick={() => onNavigate('register')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 'register' ? 'bg-[#f2f2f2] text-[#a30000]' : 'hover:bg-[#f2f2f2] hover:text-[#a30000]'
            }`}
          >
            📝 Register
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 'admin' ? 'bg-[#f2f2f2] text-[#a30000]' : 'hover:bg-[#f2f2f2] hover:text-[#a30000]'
            }`}
          >
            🔒 Admin
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
