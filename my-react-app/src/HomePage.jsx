import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Navigate to Login page
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Navigate to Sign-Up page
  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="title">Welcome to Our App</h1>
        <p className="description">Your gateway to secure and easy access management.</p>
        
        <div className="buttons">
          <button onClick={handleLoginRedirect} className="button">
            Login
          </button>
          <button onClick={handleSignUpRedirect} className="button">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
