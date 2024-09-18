// routes/itemRoutes.js
const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/', itemController.getItemSales);
router.get('/chart', itemController.getChartData);

module.exports = router;
