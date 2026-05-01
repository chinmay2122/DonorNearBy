// Sample API requests for testing the Blood Bank Management System

// 1. Get all blood banks
async function getAllBloodBanks() {
  try {
    const response = await fetch('http://localhost:5000/api/blood-banks');
    const data = await response.json();
    console.log('All blood banks:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 2. Search by blood type
async function searchByBloodType(bloodType) {
  try {
    const response = await fetch(`http://localhost:5000/api/search?bloodType=${bloodType}`);
    const data = await response.json();
    console.log(`Blood banks with ${bloodType}:`, data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 3. Get specific blood bank
async function getBloodBankById(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/blood-banks/${id}`);
    const data = await response.json();
    console.log('Blood bank details:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 4. Add new blood bank
async function addBloodBank(bankData) {
  try {
    const response = await fetch('http://localhost:5000/api/blood-banks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'New Blood Bank',
        address: '999 Hospital Lane',
        city: 'Los Angeles',
        phone: '+1-555-0999',
        latitude: 34.0522,
        longitude: -118.2437,
        hours: '24/7',
        inventory: {
          'A+': 50,
          'A-': 30,
          'B+': 45,
          'B-': 25,
          'AB+': 20,
          'AB-': 15,
          'O+': 60,
          'O-': 40,
        },
      }),
    });
    const data = await response.json();
    console.log('New blood bank created:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 5. Update blood bank inventory
async function updateInventory(bankId, inventory) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/blood-banks/${bankId}/inventory`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inventory }),
      }
    );
    const data = await response.json();
    console.log('Inventory updated:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 6. Delete blood bank
async function deleteBloodBank(bankId) {
  try {
    const response = await fetch(`http://localhost:5000/api/blood-banks/${bankId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Blood bank deleted:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test the functions
// getAllBloodBanks();
// searchByBloodType('A+');
// getBloodBankById(1);
// addBloodBank({...});
// updateInventory(1, { 'A+': 75, 'B+': 50, ... });
// deleteBloodBank(1);
