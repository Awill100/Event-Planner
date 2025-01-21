import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const navigate = useNavigate();  // Hook to navigate after login

  // Predefined users (for example)
  const users = JSON.parse(localStorage.getItem('users')) || [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  // Validate input fields
  const validate = () => {
    const validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (username.length < 3) {
      validationErrors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Navigate to Sign Up page
  const goToSignUp = () => {
    navigate('/signup');
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
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="button">
          Login
        </button>

        {loginStatus && <p className="status-message">{loginStatus}</p>}

        <div className="signup-link">
          <p>Don't have an account?</p>
          <button type="button" className="button" onClick={goToSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
