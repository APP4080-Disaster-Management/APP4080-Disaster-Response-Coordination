const express = require('express');
const { getDonations, addDonation } = require('../controllers/donationsController');
const router = express.Router();

router.get('/', getDonations);
router.post('/', addDonation);

module.exports = router;
