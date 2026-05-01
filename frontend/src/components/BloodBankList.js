import React from 'react';
import BloodBankCard from './BloodBankCard';

const BloodBankList = ({ bloodBanks, selectedBloodType, userLocation }) => {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const banksWithDistance = userLocation
    ? bloodBanks.map((bank) => ({
        ...bank,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          bank.latitude,
          bank.longitude
        ),
      }))
    : bloodBanks;

  const sortedBanks = userLocation
    ? [...banksWithDistance].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    : banksWithDistance;

  if (sortedBanks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-lg">
          {selectedBloodType 
            ? `No blood banks found with ${selectedBloodType} blood type` 
            : 'Select a blood type to search'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedBanks.map((bank) => (
        <BloodBankCard 
          key={bank.id} 
          bank={bank} 
          selectedBloodType={selectedBloodType}
        />
      ))}
    </div>
  );
};

export default BloodBankList;
