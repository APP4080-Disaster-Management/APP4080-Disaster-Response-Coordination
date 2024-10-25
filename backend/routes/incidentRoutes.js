
const express = require('express');
const { reportIncident, verifyIncident } = require('../controllers/incidentController');

const protect = require('../middleware/authMiddleware'); // Ensure this file exists
const router = express.Router();

router.post('/report', protect, reportIncident);  // Using protect middleware for auth
router.put('/verify/:id', protect, verifyIncident);

module.exports = router;


