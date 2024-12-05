const express = require('express');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.post('/', ordersController.createOrder); // Create a new order
router.get('/:id', ordersController.getOrder); // Get a single order by ID
router.get('/user/:userId', ordersController.getOrdersByUser); // Get all orders for a user
router.put('/:id', ordersController.updateOrder); // Update order details
router.delete('/:id', ordersController.deleteOrder); // Delete an order

module.exports = router;
