import React, { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import config from '../config';
import axios from 'axios';
import { useAuth } from '../services/AuthContext';

const LoginPage = () => {
  const baseURL = config.baseURL;
  const { login } = useAuth();
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
      const response = await axios.post(`${baseURL}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.access_token); // Save token to local storage
        login();
      navigate('/'); 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={onChangeUsername}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-secondary">
                  Create User
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;