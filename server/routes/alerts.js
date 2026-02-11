const express = require('express');
const router = express.Router();

const SAMPLE_ALERTS = [
  { id: 'a1', type: 'HighSmog', title: 'Heavy smog near industrial area', tag: 'HighSmog', location: 'Sector 18, Industrial Area', time: '2026-02-11T19:35:00Z', verified: true, upvotes: 15 },
  { id: 'a2', type: 'WaterShortage', title: 'Public water supply disrupted', tag: 'WaterShortage', location: 'Sector 25, Residential Colony', time: '2026-02-11T16:35:00Z', verified: false, upvotes: 8 },
  { id: 'a3', type: 'CoolingCenter', title: 'Community center opened as cooling center', tag: 'CoolingCenter', location: 'Sector 5, Community Park', time: '2026-02-11T20:35:00Z', verified: true, upvotes: 23 },
];

router.get('/', (req, res) => {
  res.json(SAMPLE_ALERTS);
});

module.exports = router;
