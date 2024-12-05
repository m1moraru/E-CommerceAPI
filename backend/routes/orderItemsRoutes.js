const express = require('express');
const orderItemsController = require('../controllers/orderItemsController');

const router = express.Router();

router.post('/', orderItemsController.createOrderItem);
router.get('/:id', orderItemsController.getOrderItem);
router.get('/order/:orderId', orderItemsController.getOrderItemsByOrder);
router.put('/:id', orderItemsController.updateOrderItem);
router.delete('/:id', orderItemsController.deleteOrderItem);

module.exports = router;
