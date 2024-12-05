const express = require('express');
const cartsController = require('../controllers/cartsController');

const router = express.Router();

router.post('/', cartsController.createCart);
router.get('/:id', cartsController.getCart);
router.get('/user/:userId', cartsController.getCartByUser);
router.put('/:id', cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart);

module.exports = router;
