import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';  // Importing Auth context
import Weather from '../Components/Weather';

const Home = () => {
  const [location, setLocation] = useState('');
  const [defaultLocation, setDefaultLocation] = useState(null);
  const { user } = useAuth();  // Accessing user data from AuthContext

  useEffect(() => {
    if (user) {
      console.log('Logged in user data:', user);  // Log user info after successful login/signup
    }

    // Geolocation functionality to get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `http://api.weatherapi.com/v1/current.json?key=342d4b5c8d4c4e8aa91155720250201&q=${latitude},${longitude}&aqi=no`
        )
          .then((response) => response.json())
          .then((data) => setDefaultLocation(data.location.name))  // Set location name based on geolocation
          .catch((error) => console.error('Error fetching location:', error));
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  }, [user]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);  // Update location value
  };

  const handleSearch = () => {
    if (location) {
      setDefaultLocation(location);  // Update default location to searched location
    } else {
      alert('Please enter a location');  // Alert if no location entered
    }
  };

  return (
    <>
      <div className="home-container">
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

        {/* User Greeting */}
        {user ? (
          <div className="welcome-message">
            <h2>Welcome, {user.email}</h2> {/* Display logged-in user email */}
          </div>
        ) : (
          <div className="welcome-message">
            <h2>Welcome, Guest</h2>
          </div>
        )}

        {/* Search bar to change location */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Display weather info based on location */}
      <Weather location={defaultLocation || 'Cyprus'} />
    </>
  );
};

export default Home;
