import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <p>Loading order history...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <h2>Order #{order.id}</h2>
              <p>Status: {order.status}</p>
              <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x £{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
