const express = require('express');
const { reportIncident, verifyIncident } = require('../controllers/incidentController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/report', protect, reportIncident);
router.put('/verify/:id', protect, verifyIncident);

module.exports = router;
