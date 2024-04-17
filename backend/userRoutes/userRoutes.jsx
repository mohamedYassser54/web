const express = require('express');
const router = express.Router();
const { loginUser } = require('../user/loginController');

router.post('/loginUser', loginUser);

module.exports = router;
