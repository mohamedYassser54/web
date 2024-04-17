const express = require('express');
const router = express.Router();
const removeController = require('../user/removeController');

router.delete('/remove/:id', removeController);

module.exports = router;
