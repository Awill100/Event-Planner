import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState('');

  const navigate = useNavigate();  // Hook to navigate after login

  // Predefined users (for example)
  const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  // Validate input fields
  const validate = () => {
    const validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    return validationErrors;
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check credentials
    const userExists = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      setLoginStatus(`Welcome, ${username}!`);
      setErrors({});
      // Redirect to MainPage after successful login
      navigate('/main');
    } else {
      setLoginStatus('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h2 className="title">Login</h2>

        <div className="input-group">
          <label className="label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Enter your username"
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div className="input-group">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Enter your password"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="button">
          Login
        </button>

        {loginStatus && <p className="status-message">{loginStatus}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
