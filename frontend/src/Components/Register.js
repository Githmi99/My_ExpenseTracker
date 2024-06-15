import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      onRegister(token);
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed');
    }
  };

  return (
    <RegisterStyled>
      <div className="register-container">
        <div className="register-header">
          <h1><i className="fas fa-user-plus"></i> Register</h1>
        </div>
        <div className="register-form">
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
            <button type="submit" className="btn">Sign Up</button>
          </form>
        </div>
      </div>
    </RegisterStyled>
  );
}

const RegisterStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${props => props.bg}) no-repeat center center fixed;
  background-size: cover;

  .register-container {
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .register-header h1 {
    margin: 0;
    font-size: 2em;
    color: #333;
  }

  .register-form {
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
    background: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  .btn:hover {
    background: #45a049;
  }
`;

export default Register;
