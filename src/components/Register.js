import React, { useState } from 'react';
import config from '../config';
import axios from 'axios';
import { Link } from "react-router-dom"; 


const CreateUserPage = () => {
  const baseURL = config.baseURL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [is_Admin, setAdmin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const onChangeIsAdmin = (e) => setAdmin(e.target.checked);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    // Simple validation: check if password and confirmPassword match
    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setLoading(false);
        return;
      }

    const data = {
        username,
        password,
        is_admin:is_Admin,
      };
    try {
      await axios.post(`${baseURL}/auth/register`,data);
      setErrorMessage("")

      // Simulate a success response
      setTimeout(() => {
        setSuccessMessage("User created successfully!");
        setLoading(false);
      }, 1000);

    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
            setErrorMessage(error.response.data.msg);

          } else {
            setErrorMessage('An unknown error occurred.');
          }
          setLoading(false);
          
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">Name:</label>
          <input
            id="username"
            type="text"
            className="form-control"
            value={username}
            onChange={onChangeUsername}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={onChangePassword}
            required
            minLength={6}  // Password must be at least 6 characters long
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isAdmin"
            checked={is_Admin}
            onChange={onChangeIsAdmin}
          />
          <label className="form-check-label" htmlFor="isAdmin">Is Admin</label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating User..." : "Create User"}
        </button>
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </form>

      {/* Navigation Links */}
      <div className="mt-4">
        <Link to="/login" className="btn btn-link">Go to Login Page</Link>
        <Link to="/" className="btn btn-link">Go to Home Page</Link>
      </div>
    </div>
  );
};


export default CreateUserPage;