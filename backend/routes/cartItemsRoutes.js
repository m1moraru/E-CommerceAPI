const express = require('express');
const cartItemsController = require('../controllers/cartItemsController');

const router = express.Router();

router.post('/', cartItemsController.createCartItem);
router.get('/:id', cartItemsController.getCartItem);
router.get('/cart/:cartId', cartItemsController.getCartItemsByCart);
router.put('/:id', cartItemsController.updateCartItem);
router.delete('/:id', cartItemsController.deleteCartItem);

module.exports = router;
