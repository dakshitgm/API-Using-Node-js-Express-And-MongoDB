const express = require('express');
const router = express.Router();

const userCntrl = require('../controllers/user');

router.post('/signup', userCntrl.signUp);
router.post('/login', userCntrl.login);

module.exports = router;