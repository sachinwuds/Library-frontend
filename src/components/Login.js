import React, { useState, useEffect  } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  // Check if token exists when the component loads
  useEffect(() => {
    // const token = localStorage.getItem('token');
    
    // If token exists, redirect to the Book page
    // if (token) {
    //   navigate('/');
    // }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.access_token); // Save token to local storage
      navigate('/'); 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;