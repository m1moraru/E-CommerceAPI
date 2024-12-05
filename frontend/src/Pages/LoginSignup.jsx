import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import facebook_icon from '../Components/Assets/facebook_icon.png';
import google_icon from '../Components/Assets/google_icon.png';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Logged in user data:", userData);
        login(userData); 
        setNotification('Login successful!');
        console.log("Notification set to:", 'Login successful!');
        setTimeout(() => {
          setNotification('');
          navigate(from, { replace: true }); 
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSocialLogin = (platform) => {
    const baseUrl = 'http://localhost:3001/api/users/auth';
    if (platform === 'google') {
      window.location.href = `${baseUrl}/google`;
    } else if (platform === 'facebook') {
      window.location.href = `${baseUrl}/facebook`;
    }
  };

  return (
    <div className="loginsignup">
      {notification && (
        <>
          <div className="overlay"></div>
          <div className="notification">{notification}</div>
        </>
      )}
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="loginsignup-error">{error}</p>}
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p className="loginsignup-login">
          Don&apos;t have an account?{' '}
          <span
            className="signup-link"
            onClick={() => navigate('/signup', { replace: true })}
          >
            Sign up here
          </span>
        </p>
        <div className="social-login">
          <p>Or login with:</p>
          <div className="social-icons">
            <button onClick={() => handleSocialLogin('google')} className="sib">
              <img src={google_icon} alt="Google Login" />
            </button>
            <button onClick={() => handleSocialLogin('facebook')} className="sib">
              <img src={facebook_icon} alt="Facebook Login" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;





