const Orders = require('../models/orders'); // Import your Orders model

// Fetch order history for the logged-in user
const getOrderHistory = async (req, res) => {
  const userId = req.user.id; 

  try {
    // Use the Orders model to fetch all orders for the logged-in user
    const orders = await Orders.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error.message);
    res.status(500).json({ message: 'Error fetching order history' });
  }
};

module.exports = {
  getOrderHistory,
};