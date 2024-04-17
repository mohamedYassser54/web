const express = require('express');
const router = express.Router();
const cvController = require('../user/cvController');

router.post('/employees', cvController.uploadEmployeeCV);
router.post('/companydata2', cvController.uploadCompanyData);

module.exports = router;
