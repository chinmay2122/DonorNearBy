import React from 'react';

const Header = () => {
  return (
    <header className="gradient-primary text-white shadow-xl">
      <div className="container-custom py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src="/logo.svg" alt="DonorNearBy logo" className="w-12 h-12 rounded-full bg-[#f2f2f2] p-1" />
            <h1 className="text-4xl md:text-5xl font-bold">DonorNearBy</h1>
          </div>
          <p className="text-lg opacity-90">Find blood donors near you instantly</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
