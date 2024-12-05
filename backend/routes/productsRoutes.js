const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/', productsController.createProduct); // Add a new product
router.get('/:id', productsController.getProduct); // Get product by ID
router.get('/', productsController.getAllProducts); // Get all products
router.put('/:id', productsController.updateProduct); // Update a product
router.delete('/:id', productsController.deleteProduct); // Delete a product

module.exports = router;
