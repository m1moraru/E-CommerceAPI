import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom'; 
import remove_icon from '../Assets/cart_cross_icon.png';
import { useAuth } from '../../Context/AuthContext';

function CartItems() {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate(); 
  const { isAuthenticated } = useAuth();
  const [showNotification, setShowNotification] = useState(false);

  const handleCheckout = () => {
  
    if (!isAuthenticated) {
      setShowNotification(true);
      return;
    }

    if (getTotalCartAmount() === 0) {
      alert('Your cart is empty. Please add some products before proceeding to checkout.');
      return;
    }
    navigate('/checkout'); 
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
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>

            {showNotification && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <p className="popup-p">Please log in to proceed to checkout.</p>
                  <button className="popup-btn" onClick={() => navigate('/login')}>Go to Login</button>
                  <button className="popup-btn" onClick={() => setShowNotification(false)}>Close</button>
                  <br/>
                  <p className="signup-p" >Don't have an account? {''}
                    <span
                    className="popup-link"
                    onClick={() => navigate('/SignUp')}>
                      Sign up
                    </span> {''}
                    here.
                  </p>
                </div>
              </div>
            )}

          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItems;
