import React from 'react';

const BloodBankCard = ({ bank, selectedBloodType }) => {
  const getBloodTypeColor = (type) => {
    const colors = {
      'A+': 'bg-[#c91c1c]',
      'A-': 'bg-[#961414]',
      'B+': 'bg-[#a30000]',
      'B-': 'bg-[#3a1a1a]',
      'AB+': 'bg-[#c91c1c]',
      'AB-': 'bg-[#961414]',
      'O+': 'bg-[#a30000]',
      'O-': 'bg-[#3a1a1a]',
    };
    return colors[type] || 'bg-[#961414]';
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-[#a30000]' };
    if (quantity < 5) return { text: 'Low Stock', color: 'text-[#c91c1c]' };
    return { text: 'In Stock', color: 'text-[#3a1a1a]' };
  };

  const inventory = bank.inventory || {};

  return (
    <div className="card-shadow bg-white rounded-lg overflow-hidden border border-[#961414]/15">
      {/* Header */}
      <div className="gradient-primary text-white p-4">
        <h3 className="text-xl font-bold mb-1">{bank.name}</h3>
        <p className="text-sm opacity-90">{bank.city}</p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location & Contact */}
        <div className="mb-4 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-lg">📍</span>
            <div>
              <p className="text-sm text-gray-600">{bank.address}</p>
              {bank.distance && (
                <p className="text-sm font-semibold text-[#a30000]">
                  {bank.distance} km away
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📞</span>
            <a href={`tel:${bank.phone}`} className="text-[#a30000] hover:underline text-sm">
              {bank.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">⏰</span>
            <p className="text-sm text-gray-600">{bank.hours || '24/7'}</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Blood Inventory */}
        <div>
          <h4 className="font-bold text-[#3a1a1a] mb-3">Blood Inventory</h4>
          <div className="grid grid-cols-2 gap-2">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => {
              const quantity = inventory[type] || 0;
              const status = getStockStatus(quantity);
              const isSelected = selectedBloodType === type;

              return (
                <div
                  key={type}
                  className={`p-2 rounded-lg border-2 ${
                    isSelected ? 'border-[#a30000] bg-[#f2f2f2]' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${getBloodTypeColor(
                        type
                      )}`}
                    ></span>
                    <span className="font-bold text-sm">{type}</span>
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold">{quantity} units</p>
                    <p className={`text-xs font-semibold ${status.color}`}>
                      {status.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Request Button */}
        <button className="w-full mt-4 gradient-primary text-white font-bold py-2 rounded-lg hover:shadow-lg transition">
          📋 Request Blood
        </button>
      </div>
    </div>
  );
};

export default BloodBankCard;
