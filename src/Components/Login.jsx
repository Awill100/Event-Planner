import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import '../style/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("Login successful");
      navigate('/home');
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className='login-wrapper'>
      {/* Inline CSS for welcome-message */}
      <style>
          {`
            .welcome-message {
              text-align: center;
              color: white;
              margin-top: 20px;
            }
            .search-bar button {
              margin: 10px 0;
            }
            
            .search-bar button:hover {
              background-color: #0056b3;
            }
          `}
        </style>
      <div className="welcome-message">
          <h2>Login</h2> {/* Display logged-in user email */}
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
