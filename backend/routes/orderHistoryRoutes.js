const express = require('express');
const router = express.Router();
const { getOrderHistory } = require('../controllers/orderHistoryController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

router.get('/', ensureAuthenticated, getOrderHistory);

module.exports = router;