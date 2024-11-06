// routes/volunteers.js
const express = require('express');
const { registerVolunteer, getAllVolunteers } = require('../controllers/volunteersController');
const router = express.Router();

// Route to register a volunteer
router.post('/', registerVolunteer);

// Route to get all volunteers
router.get('/', getAllVolunteers);

module.exports = router;
