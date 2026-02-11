const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// GET /api/places?lat=...&lon=...&type=hospital|pharmacy|point_of_interest&radius=5000
router.get('/', async (req, res) => {
  const { lat, lon, type = '', radius = 5000 } = req.query;
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Google Maps API key not configured on server.' });
  }
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon are required' });

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}${type ? `&type=${type}` : ''}&key=${key}`;
    const r = await fetch(url);
    const body = await r.json();
    if (!body.results) return res.status(200).json([]);

    const mapped = body.results.map((p) => ({
      id: p.place_id,
      name: p.name,
      address: p.vicinity || p.formatted_address,
      latitude: p.geometry?.location?.lat,
      longitude: p.geometry?.location?.lng,
      rating: p.rating,
      raw: p,
    }));

    res.json(mapped);
  } catch (err) {
    console.error('Places proxy error', err);
    res.status(500).json({ error: 'Places lookup failed' });
  }
});

module.exports = router;
