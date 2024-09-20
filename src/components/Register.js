import React, { useState } from 'react';
import config from '../config';
import axios from 'axios';

const baseURL = config.baseURL;
const CreateUserPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [is_Admin, setAdmin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/auth/register`, { username, password, is_admin:is_Admin });
      alert('User created successfully');
      setErrorMessage("")
    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
            setErrorMessage(error.response.data.msg);
            alert(error.response.data.msg); 

          } else {
            setErrorMessage('An unknown error occurred.');
          }
          
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

  const onChangeIsAdmin = (e) => {
    const isAdmin = e.target.value;
    setAdmin(isAdmin);
  };
  

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={username} onChange={onChangeUsername} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={onChangePassword} required />
        </label>
        <br />
        <label>
          Is Admin:
          <input type="checkbox" value={is_Admin} onChange={onChangeIsAdmin}  />
        </label>
        <br />
        <button type="submit">Create User</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CreateUserPage;