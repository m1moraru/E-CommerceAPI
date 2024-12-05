const Products = require('../models/products');

const productsController = {
  async createProduct(req, res) {
    try {
      const { name, price, description } = req.body;
      const product = await Products.createProduct({ name, price, description });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await Products.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedProduct = await Products.updateProduct(id, updates);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await Products.deleteProduct(id);
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productsController;
