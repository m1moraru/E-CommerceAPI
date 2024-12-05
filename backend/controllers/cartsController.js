const Carts = require('../models/carts');

const cartsController = {
  async createCart(req, res) {
    try {
      const { userId } = req.body;
      const cart = await Carts.createCart(userId);
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCart(req, res) {
    try {
      const { id } = req.params;
      const cart = await Carts.getCartById(id);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCartByUser(req, res) {
    try {
      const { userId } = req.params;
      const cart = await Carts.getCartByUser(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCart(req, res) {
    try {
      const { id } = req.params;
      const updatedCart = await Carts.updateCart(id);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCart(req, res) {
    try {
      const { id } = req.params;
      const deletedCart = await Carts.deleteCart(id);
      res.status(200).json(deletedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = cartsController;
