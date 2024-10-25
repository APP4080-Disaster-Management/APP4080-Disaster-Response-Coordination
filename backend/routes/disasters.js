// routes/disasters.js
const express = require('express');
const router = express.Router();
const Disaster = require('../models/Disaster');

// POST /api/disasters - Create a new disaster report
router.post('/', async (req, res) => {
  const { disasterType, location, description } = req.body;
  try {
    const disaster = new Disaster({
      disasterType,
      location,
      description,
    });
    await disaster.save();
    res.status(201).json({ message: 'Disaster report created', disaster });
  } catch (error) {
    console.error('Error creating disaster report:', error);
    res.status(500).json({ error: 'Failed to create disaster report' });
  }
});

module.exports = router;
