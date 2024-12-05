import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const { isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false); 

  const handleAddToCart = () => {
    console.log('Handle Add to Cart clicked');
    console.log('Is Authenticated:', isAuthenticated);

    if (!isAuthenticated) {
      setShowNotification(true); 
      return;
    }
    addToCart(product.id); 
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(144)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">£{product.old_price}</div>
          <div className="productdisplay-right-price-new">£{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a
          a round neckline and short sleeves, worn as an undershirt or outer garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <button onClick={handleAddToCart}>ADD TO CART</button>
          <p className="productdisplay-right-category">
            <span>Category :</span> Women, T-Shirt, Crop Top
          </p>
          <p className="productdisplay-right-category">
            <span>Tags :</span> Modern, Latest
          </p>
        </div>
      </div>

      {/* Popup Notification */}
      {showNotification && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <p className="popup-p">You need to log in to add items to your cart.</p>
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
  );
};

export default ProductDisplay;
