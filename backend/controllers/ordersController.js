const Orders = require('../models/orders');
const OrderItems = require('../models/orderItems');

const ordersController = {

  async createOrder(req, res) {
    try {
      const { total, status, userId, items } = req.body;

      // Step 1: Create order
      const order = await Orders.createOrder({ total, status, userId });

      // Step 2: Create order items
      const orderId = order.id;
      const orderItemsPromises = items.map(item =>
        OrderItems.createOrderItem({
          orderId,
          productId: item.productId,
          qty: item.qty,
          price: item.price,
          name: item.name,
          description: item.description,
        })
      );
      await Promise.all(orderItemsPromises);

      res.status(201).json({ order, items });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOrdersByUser(req, res) {
    try {
      const { userId } = req.params;
      const orders = await Orders.getOrdersByUser(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedOrder = await Orders.updateOrder(id, updates);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const deletedOrder = await Orders.deleteOrder(id);
      res.status(200).json(deletedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ordersController;
