import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventPlanningPage.css";
import "./MainPage.css";

const MainPage = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherMessage, setWeatherMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const apiKey = "342d4b5c8d4c4e8aa91155720250201"; // Replace with your Weather API key

  const countryCityData = {
    USA: [
      { name: "New York", lat: 40.7128, lon: -74.006 },
      { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
      { name: "Chicago", lat: 41.8781, lon: -87.6298 },
      { name: "Houston", lat: 29.7604, lon: -95.3698 },
      { name: "Miami", lat: 25.7617, lon: -80.1918 },
    ],
    India: [
      { name: "Delhi", lat: 28.7041, lon: 77.1025 },
      { name: "Mumbai", lat: 19.076, lon: 72.8777 },
      { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
      { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
      { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
    ],
  };

  const events = [
    "Conference",
    "Wedding",
    "Birthday Party",
    "Workshop",
    "Music Concert",
    "Sports Event",
  ];

  const navigate = useNavigate(); // Hook to navigate to other pages

  // Fetch weather data based on coordinates (lat, lon)
  const getWeather = async (lat, lon) => {
    setLoadingWeather(true);
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;

      setWeather(`Temperature: ${temp}°C, Condition: ${condition}`);
      setWeatherMessage(
        temp > 20 ? "Good weather for an event!" : "Bad weather, consider indoor options."
      );
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather("Error fetching weather data");
      setWeatherMessage("Weather data not available.");
    } finally {
      setLoadingWeather(false);
    }
  };

  const getDefaultCityWeather = () => {
    const defaultCity = { lat: 40.7128, lon: -74.006 }; // Default to New York
    getWeather(defaultCity.lat, defaultCity.lon);
  };

  useEffect(() => {
    getDefaultCityWeather();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setCities(countryCityData[selectedCountry] || []);
      setSelectedCity("");
    }
  }, [selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventDate && eventTime && selectedCity) {
      const selectedCityData = cities.find((city) => city.name === selectedCity);
      if (selectedCityData) {
        getWeather(selectedCityData.lat, selectedCityData.lon);
      }
      setShowModal(true);
      setShowFormModal(false);
    }
  };

  const closeModal = () => setShowModal(false);

  const openFormModal = () => setShowFormModal(true);

  const closeFormModal = () => setShowFormModal(false);

  const handleLogout = () => {
    alert("You have logged out!");

    // Clear any authentication data (localStorage, sessionStorage, etc.)
    localStorage.removeItem("userToken"); // Example of clearing token from localStorage

    // Redirect to the login page
    navigate("/"); // This will navigate to the login page (make sure you've set up the route for login)
  };

  return (
    <div className="event-planning-container">
      {/* Header with logo on the left and logout button on the right */}
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Logo" className="logo-img" />
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Display current weather */}
      <div className="weather-info">
        <h3>Current Weather (New York)</h3>
        {loadingWeather ? (
          <p>Loading weather...</p>
        ) : (
          <>
            <p>{weather}</p>
            <p>{weatherMessage}</p>
          </>
        )}
      </div>

      {/* Event Selection Section */}
      <div className="eventWrapper">
        <div className="event-selection">
          <label>Select Event Type</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            required
          >
            <option value="">Select Event</option>
            {events.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={openFormModal}
          className="open-form-btn"
          disabled={!selectedEvent}
        >
          Plan Event
        </button>
        {selectedEvent && <div className="eventDetails">Selected Event: {selectedEvent}</div>}
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="form-title">Plan Your Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Event Type</label>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  required
                >
                  <option value="">Select Event Type</option>
                  {events.map((event, index) => (
                    <option key={index} value={event}>
                      {event}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Event Date</label>
                <DatePicker
                  selected={eventDate}
                  onChange={(date) => setEventDate(date)}
                  minDate={new Date()}
                  placeholderText="Select a date"
                  dateFormat="yyyy/MM/dd"
                  required
                />
              </div>

              <div className="input-group">
                <label>Event Time</label>
                <DatePicker
                  selected={eventTime}
                  onChange={(time) => setEventTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  required
                />
              </div>

              <div className="input-group">
                <label>Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  {Object.keys(countryCityData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-btn">
                Plan Event
              </button>
              <button
                type="button"
                className="reset-btn"
                onClick={closeFormModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for displaying results */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Event Details</h3>
            <p>
              <strong>Event Type:</strong> {selectedEvent}
            </p>
            <p>
              <strong>Event Date:</strong> {eventDate?.toLocaleDateString()}
            </p>
            <p>
              <strong>Event Time:</strong> {eventTime?.toLocaleTimeString()}
            </p>
            <p>
              <strong>City:</strong> {selectedCity}
            </p>
            <p>
              <strong>Country:</strong> {selectedCountry}
            </p>
            <p>
              <strong>Weather:</strong> {weather}
            </p>
            <p>
              <strong>Weather Suggestion:</strong> {weatherMessage}
            </p>
            <button className="reset-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
