const OrderItems = require('../models/orderItems');

const orderItemsController = {
  async createOrderItem(req, res) {
    try {
      const { orderId, productId, qty, price, name, description } = req.body;
      const orderItem = await OrderItems.createOrderItem({ orderId, productId, qty, price, name, description });
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOrderItem(req, res) {
    try {
      const { id } = req.params;
      const orderItem = await OrderItems.getOrderItemById(id);
      if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOrderItemsByOrder(req, res) {
    try {
      const { orderId } = req.params;
      const orderItems = await OrderItems.getOrderItemsByOrder(orderId);
      res.status(200).json(orderItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateOrderItem(req, res) {
    try {
      const { id } = req.params;
      const { qty, price, name, description } = req.body;
      const updatedOrderItem = await OrderItems.updateOrderItem(id, { qty, price, name, description });
      res.status(200).json(updatedOrderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteOrderItem(req, res) {
    try {
      const { id } = req.params;
      const deletedOrderItem = await OrderItems.deleteOrderItem(id);
      res.status(200).json(deletedOrderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderItemsController;
