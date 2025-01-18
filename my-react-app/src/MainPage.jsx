import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventPlanningPage.css";

const EventPlanningPage = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherMessage, setWeatherMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [cities, setCities] = useState([]);

  const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key

  // Hardcoded list of countries and their respective cities
  const countryCityData = {
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
    India: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Kolkata"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    UK: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  };

  // List of events
  const events = [
    "Conference",
    "Wedding",
    "Birthday Party",
    "Workshop",
    "Music Concert",
    "Sports Event",
  ];

  // Get weather forecast for the selected city
  const getWeather = async (city, country) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const temp = data.main.temp;
      const description = data.weather[0].description;

      setWeather(`Temperature: ${temp}°C, Condition: ${description}`);
      setWeatherMessage(
        temp > 20
          ? "Good weather for an event!"
          : "Bad weather, consider indoor options."
      );
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  // Handle country selection
  useEffect(() => {
    if (selectedCountry) {
      setCities(countryCityData[selectedCountry] || []);
      setSelectedCity(""); // Reset the city selection
    }
  }, [selectedCountry]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventDate && eventTime && selectedCity && selectedCountry) {
      getWeather(selectedCity, selectedCountry);
    }
  };

  return (
    <div className="event-planning-container">
      <div className="event-planning-form">
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
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Plan Event
          </button>
        </form>

        <div className="weather-info">
          {weather && <p className="weather">{weather}</p>}
          {weatherMessage && <p className="weather-message">{weatherMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default EventPlanningPage;
