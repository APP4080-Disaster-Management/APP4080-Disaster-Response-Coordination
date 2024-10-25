const express = require('express');
const router = express.Router();
const { signup, login, getUsers }  = require('../controllers/authController');
// const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);

module.exports = router;
