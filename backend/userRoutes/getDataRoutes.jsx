const express = require('express');
const router = express.Router();
const getDataController = require('../user/getDataController');

router.get('/get', getDataController.getEmployeesData);
router.get('/getdata', getDataController.getEmployeesData);
router.get('/companydata', getDataController.getCompanyData);

module.exports = router;
