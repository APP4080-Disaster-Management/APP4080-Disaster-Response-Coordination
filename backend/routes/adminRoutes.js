const express = require('express');
const { getDashboardData } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Admin dashboard route
router.get('/dashboard', protect, getDashboardData);

module.exports = router;
