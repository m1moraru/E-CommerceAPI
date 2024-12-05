const CartItems = require('../models/cartItems');


const cartItemsController = {
  async createCartItem(req, res) {
    try {
      const { cartId, productId, productName, productImage, price, qty } = req.body;
      const cartItem = await CartItems.createCartItem({ cartId, productId, productName, productImage, price, qty });
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCartItem(req, res) {
    try {
      const { id } = req.params;
      const cartItem = await CartItems.getCartItemById(id);
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCartItemsByCart(req, res) {
    try {
      const { cartId } = req.params;
      const cartItems = await CartItems.getCartItemsByCart(cartId);
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCartItem(req, res) {
    try {
      const { id } = req.params;
      const { qty, price } = req.body;
      const updatedCartItem = await CartItems.updateCartItem(id, { qty, price });
      res.status(200).json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCartItem(req, res) {
    try {
      const { id } = req.params;
      const deletedCartItem = await CartItems.deleteCartItem(id);
      res.status(200).json(deletedCartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = cartItemsController;
