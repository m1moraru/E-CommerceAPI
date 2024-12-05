import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext'; 
import './CSS/Account.css';

const Account = () => {
  const { user } = useAuth();
  const [formattedDate, setFormattedDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCreatedAt = async () => {
      if (user && user.token) {
        try {
          const response = await fetch('http://localhost:3001/api/users/created_at', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`, 
            },
          });
    
          if (response.status === 401) {
            throw new Error('Unauthorized - Please log in again');
          }
    
          if (!response.ok) {
            throw new Error('Failed to fetch user creation date');
          }
    
          const data = await response.json();
          const formatted = new Date(data.created_at).toLocaleString();
          setFormattedDate(formatted);
        } catch (err) {
          setError(`Error: ${err.message}`);
          console.error(err);
        }
      }
    };

    fetchCreatedAt();
  }, [user]); 

  if (error) {
    return (
      <div className="error-message">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="error-message">
        <h2>Error</h2>
        <p>Failed to fetch user details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="account-container">
      <h1>Account Details</h1>
      <br/>
      <br/>
      <br/>
      <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {formattedDate}</p>
      <br/>
      <br/>
      <br/>
      <button>Update</button>
    </div>
   
  );
};

export default Account;

