const express = require('express');
const router = express.Router();

// Sample services - could be moved to DB later
const SAMPLE_SERVICES = [
  { id: 's1', category: 'Hospitals', name: 'Apollo Hospital', address: 'MG Road, Sector 12', distance: '1.2 km', phone: '+911234567890', emergency: true, rating: 4.5 },
  { id: 's2', category: 'Hospitals', name: 'Max Hospital', address: 'Nehru Place, Sector 18', distance: '2.5 km', phone: '+911234567891', emergency: true, rating: 4.3 },
  { id: 's3', category: 'Pharmacies', name: 'MedPlus Pharmacy', address: 'Main Market, Sector 8', distance: '0.5 km', phone: '+911234567892', open24: true, rating: 4.2 },
  { id: 's4', category: 'Pharmacies', name: 'Apollo Pharmacy', address: 'Central Plaza, Sector 10', distance: '0.8 km', phone: '+911234567893', rating: 4.4 },
  { id: 's5', category: 'Cooling', name: 'Community Center - Sector 5', address: 'Community Park, Sector 5', distance: '0.9 km', phone: '+911234567894', capacity: 'High' },
  { id: 's6', category: 'Cooling', name: 'Public Library Cooling', address: 'Library Road, Sector 11', distance: '1.5 km', phone: '+911234567895', capacity: 'Medium' },
];

router.get('/', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'All') {
    const filtered = SAMPLE_SERVICES.filter((s) => (category === 'Cooling' ? s.category === 'Cooling' : s.category === category));
    return res.json(filtered);
  }
  res.json(SAMPLE_SERVICES);
});

module.exports = router;
