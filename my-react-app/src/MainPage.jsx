import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventPlanningPage.css";
import "./MainPage.css";

const MainPage = () => {
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [weather, setWeather] = useState(
    "Temperature: 22°C, Condition: Clear skies"
  ); // Static default weather
  const [weatherMessage, setWeatherMessage] = useState(
    "Good weather for an event!" // Static message
  );
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCityMap, setCountryCityMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const apiKey = "342d4b5c8d4c4e8aa91155720250201"; // Replace with your Weather API key
  const cityApiUrl =
    "https://countriesnow.space/api/v0.1/countries/population/cities";

  const events = [
    "Conference",
    "Wedding",
    "Birthday Party",
    "Workshop",
    "Music Concert",
    "Sports Event",
  ];
  const navigate = useNavigate();

  // Fetch weather data based on coordinates (lat, lon)
  const getWeather = async (lat, lon) => {
    setLoadingWeather(true);
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Weather API Response:", data); // Log the full response for debugging

      // Handle specific error response
      if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
      }

      // Check if the response contains valid weather data
      if (data && data.current) {
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;

        setWeather(`Temperature: ${temp}°C, Condition: ${condition}`);
        setWeatherMessage(
          temp > 20
            ? "Good weather for an event!"
            : "Consider indoor options due to bad weather."
        );
      } else {
        throw new Error("Weather data is missing or malformed");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      // Fallback to static weather information when error occurs
      setWeather("Temperature: 22°C, Condition: Clear skies");
      setWeatherMessage("Good weather for an event!"); // Default message
    } finally {
      setLoadingWeather(false);
    }
  };

  // Fetch countries and cities data
  useEffect(() => {
    const fetchCountryCityData = async () => {
      try {
        const response = await fetch(cityApiUrl);
        const data = await response.json();

        const countryCityMap = {};
        data.data.forEach(({ country, city }) => {
          if (!countryCityMap[country]) {
            countryCityMap[country] = [];
          }

          // Hardcoding latitude and longitude for demo purposes
          const hardcodedCoordinates = {
            "New York": { lat: 40.7128, lon: -74.006 }, // Example city coordinates
            London: { lat: 51.5074, lon: -0.1278 },
            Paris: { lat: 48.8566, lon: 2.3522 },
            // Add more cities and coordinates as necessary
          };

          // If coordinates for the city exist, use them; otherwise, leave undefined
          const coordinates = hardcodedCoordinates[city];

          if (coordinates) {
            countryCityMap[country].push({ name: city, ...coordinates });
          } else {
            countryCityMap[country].push({ name: city });
          }
        });

        setCountries(Object.keys(countryCityMap));
        setCountryCityMap(countryCityMap);
      } catch (error) {
        console.error("Error fetching countries and cities:", error);
      }
    };

    fetchCountryCityData();
  }, []);

  // Update cities based on selected country
  useEffect(() => {
    if (selectedCountry) {
      setCities(countryCityMap[selectedCountry] || []);
      setSelectedCity("");
    }
  }, [selectedCountry, countryCityMap]);

  // When country or city changes, fetch the weather for the selected location
  useEffect(() => {
    if (selectedCity && selectedCountry) {
      const cityCoordinates = countryCityMap[selectedCountry]?.find(
        (city) => city.name === selectedCity
      );
      if (cityCoordinates) {
        const { lat, lon } = cityCoordinates;
        console.log(
          `Fetching weather for ${selectedCity}, ${selectedCountry} at lat: ${lat}, lon: ${lon}`
        );
        getWeather(lat, lon); // Fetch weather using the coordinates
      }
    }
  }, [selectedCity, selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventDate && eventTime && selectedCity) {
      const cityCoordinates = countryCityMap[selectedCountry]?.find(
        (city) => city.name === selectedCity
      );
      if (cityCoordinates) {
        const { lat, lon } = cityCoordinates;
        getWeather(lat, lon); // Fetch weather using the coordinates
      } else {
        console.error("City coordinates not found in map.");
      }
      setShowModal(true);
      setShowFormModal(false);
    }
  };

  const handleLogout = () => {
    alert("You have logged out!");
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <div className="event-planning-container">
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Logo" className="logo-img" />
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="weather-info">
        <h3>Current Weather</h3>
        {loadingWeather ? (
          <p>Loading weather...</p>
        ) : (
          <>
            <p>{weather}</p>
            <p>{weatherMessage}</p>
          </>
        )}
      </div>

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
          onClick={() => setShowFormModal(true)}
          className="open-form-btn"
          disabled={!selectedEvent}
        >
          Plan Event
        </button>
      </div>

      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Plan Your Event</h2>
            <p>{selectedEvent}</p>
            <form onSubmit={handleSubmit}>
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
                  {countries.map((country) => (
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
                onClick={() => setShowFormModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

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
              <strong>Location:</strong> {selectedCity}, {selectedCountry}
            </p>
            <p>{weather}</p>
            <p>{weatherMessage}</p>

            <button className="reset-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
