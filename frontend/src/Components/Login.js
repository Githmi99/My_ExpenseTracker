import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      onLogin(token);
    } catch (err) {
      console.error(err.response.data);
      alert('Invalid credentials');
    }
  };

  return (
    <LoginStyled>
      <div className="login-container">
        <div className="login-header">
          <h1><i className="fas fa-key"></i> Key</h1>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Get Started</button>
            <div className="extra-options">
              <label>
                <input type="checkbox" /> Keep Logged In
              </label>
              <a href="#">Forgot Password?</a>
            </div>
          </form>
          <div className="footer-links">
            <a href="#">Create Account</a> | <a href="#">Need Help?</a>
          </div>
        </div>
      </div>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${props => props.bg}) no-repeat center center fixed;
  background-size: cover;

  .login-container {
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .login-header h1 {
    margin: 0;
    font-size: 2em;
    color: #333;
  }

  .login-form {
    margin-top: 20px;
  }

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .input-group i {
    padding: 10px;
    background: #eee;
    border-right: 1px solid #ccc;
    color: #333;
  }

  .input-group input {
    border: none;
    padding: 10px;
    flex: 1;
    font-size: 1em;
  }

  .btn {
    background: #ff5e57;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  .btn:hover {
    background: #ff4240;
  }

  .extra-options {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 0.9em;
  }

  .extra-options a {
    color: #007BFF;
    text-decoration: none;
  }

  .extra-options a:hover {
    text-decoration: underline;
  }

  .footer-links {
    margin-top: 20px;
  }

  .footer-links a {
    color: #007BFF;
    text-decoration: none;
  }

  .footer-links a:hover {
    text-decoration: underline;
  }
`;

export default Login;
