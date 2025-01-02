import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../style/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth(); // Use user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to login after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">WeatherEvent Planner </Link>
        <ul className="navbar-links">
          {!user ? (
            <>
              <li>
                <Link to="/" className="navbar-link">Login</Link>
              </li>
              <li>
                {/* <Link to="/signup" className="navbar-link">Sign Up</Link> */}
              </li>
            </>
          ) : (
            <>
              <li onClick={handleLogout}>
                <Link>
                  Logout
                </Link>
              </li>
              <li>
                <Link to="/home" className="navbar-link">Home</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
