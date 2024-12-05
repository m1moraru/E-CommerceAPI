import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Function to log in the user and set authentication state
  const login = (userData) => {
    setUser(userData.user);
    setIsAuthenticated(true);
    navigate('/'); 
  };

  // Function to log out the user and clear authentication state
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login'); 
  };

  // Fetch current authenticated user from backend
  const fetchAuthUser = async () => {
    const token = localStorage.getItem('authToken');
    console.log("Fetching auth user. Token in localStorage:", token);

    if (token) {
      try {
        const response = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (response.data) {
          console.log("User data fetched:", response.data);
          setUser(response.data); 
          setIsAuthenticated(true); 
        } else {
          console.log("User data is empty");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      console.log("No token found in localStorage");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Automatically check authentication status on load
  useEffect(() => {
    fetchAuthUser(); 
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the custom hook
export const useAuth = () => useContext(AuthContext);
