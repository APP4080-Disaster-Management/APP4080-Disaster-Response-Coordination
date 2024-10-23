const express = require('express');
const { getVolunteers, addVolunteer } = require('../controllers/volunteersController');
const router = express.Router();

router.get('/', getVolunteers);
router.post('/', addVolunteer);

module.exports = router;
