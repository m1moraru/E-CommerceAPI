import React, { useState, useEffect, useContext } from 'react';
import '../Navbar/Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useAuth } from '../../Context/AuthContext';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const { isAuthenticated, user, logout } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User in Navbar:', user);  
  }, [user]); 

  const handleLogout = () => {
    logout();  
    navigate('/login');  
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link className="nav-link" to="/">
            Shop
          </Link>
          {menu === 'shop' && <hr />}
        </li>
        <li onClick={() => setMenu('mens')}>
          <Link className="nav-link" to="/mens">
            Mens
          </Link>
          {menu === 'mens' && <hr />}
        </li>
        <li onClick={() => setMenu('womens')}>
          <Link className="nav-link" to="/womens">
            Women
          </Link>
          {menu === 'womens' && <hr />}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link className="nav-link" to="/kids">
            Kids
          </Link>
          {menu === 'kids' && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        <div className="nav-login">
          {isAuthenticated && user ? (
            <div className="welcome-container">
              <p className="welcome-message">
                Welcome, {user?.first_name}!
              </p>
              <div className="hover-links">
                <hr />
                <Link to="/order-history" className="order-history-link">
                  Order History
                </Link>
                <Link to="/account" className="order-history-link">
                  My Account
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
        <Link to="/cart">
          <img className="cart-icon" src={cart_icon} alt="cart icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
