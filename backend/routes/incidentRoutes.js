
const express = require('express');
const { reportIncident, verifyIncident,getAllIncidents } = require('../controllers/incidentController');

const protect = require('../middleware/authMiddleware'); // Ensure this file exists
const router = express.Router();

router.post('/report', protect, reportIncident);  // Using protect middleware for auth
router.put('/verify/:id', protect, verifyIncident);
router.get('/', getAllIncidents);

module.exports = router;


