const express = require('express');
const { sendAlert, getAlerts } = require('../controllers/alertsController');
const router = express.Router();

router.get('/', getAlerts);
router.post('/', sendAlert);

module.exports = router;
