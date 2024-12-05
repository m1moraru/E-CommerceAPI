import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Components/Assets/cart_cross_icon.png';
import '../Pages/CSS/Checkout.css';
import { useAuth } from '../Context/AuthContext';

const Checkout = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const { user } = useAuth(); 
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    city: '',
    postcode: '',
    address: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {

    const cartProducts = all_product.filter((e) => cartItems[e.id] > 0);

    const orderData = {
      total: getTotalCartAmount(),
      status: 'pending',
      userId: user.id, 
      paymentMethod,
      items: cartProducts.map((item) => ({
        productId: item.id,
        qty: cartItems[item.id],
        price: item.new_price,
        name: item.name,
        description: item.description || '',
      })),
    };

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      alert(`Order placed successfully! Order ID: ${data.order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    }
  };

  const cartProducts = all_product.filter((e) => cartItems[e.id] > 0);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartProducts.length > 0 ? (
        cartProducts.map((e) => (
          <div key={e.id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={e.image} alt={e.name} className="carticon-product-icon" />
              <p>{e.name}</p>
              <p>£{e.new_price}</p>
              <button className="cartitems-quantity">{cartItems[e.id]}</button>
              <p>£{e.new_price * cartItems[e.id]}</p>
              <img
                className="cartitems-remove-icon"
                src={remove_icon}
                onClick={() => removeFromCart(e.id)}
                alt="Remove item"
              />
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>Your cart is empty. Add some items to see them here!</p>
      )}

      {cartProducts.length > 0 && (
        <>
          <div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>Subtotal</p>
                  <p>£{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>£{getTotalCartAmount()}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-container">
            <div className="checkout-form">
              <h2>Checkout Form</h2>
              <div className="checkout-form-fields">
                <div className="name-input">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                  />
                  <input
                    className="input-ln"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userDetails.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="town-city name-input">
                  <input
                    type="text"
                    name="city"
                    placeholder="Town / City"
                    value={userDetails.city}
                    onChange={handleInputChange}
                  />
                  <input
                    className="input-ln"
                    type="text"
                    name="postcode"
                    placeholder="Postcode"
                    value={userDetails.postcode}
                    onChange={handleInputChange}
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={userDetails.email}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="payment-form">
              <div className="payment-method"> 
                <h2>Select Payment Method</h2>
                <div className="payment-method-buttons">
                  <button
                    className={`payment-method-button cc ${paymentMethod === 'Credit Card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('Credit Card')}
                  >
                    Credit Card
                  </button>
                  <button
                    className={`payment-method-button pp ${paymentMethod === 'PayPal' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('PayPal')}
                  >
                    PayPal
                  </button>
                  <button
                    className={`payment-method-button str ${paymentMethod === 'Stripe' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('Stripe')}
                  >
                    Stripe
                  </button>
                </div>

                {paymentMethod === 'Credit Card' && (
                  <div className="credit-card-fields">
                    <h3>Enter Credit Card Details</h3>
                    <div>
                      <input
                        type="text"
                        placeholder="Card Number"
                        name="cardNumber"
                        value={userDetails.cardNumber}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        name="cardName"
                        value={userDetails.cardName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        name="cardExpiry"
                        value={userDetails.cardExpiry}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        name="cardCVV"
                        value={userDetails.cardCVV}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                {error && <p className="checkout-error">{error}</p>}

                <button className="checkout-button" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
