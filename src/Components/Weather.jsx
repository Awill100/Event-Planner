import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/style/weather.css';

const Weather = ({ location = "Cyprus" }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = '342d4b5c8d4c4e8aa91155720250201'; // API key
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;

  useEffect(() => {
    const fetchWeather = async () => {
      // setLoading(true);
      setError(null); // Reset the error state
      try {
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError('Unable to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!weatherData) return <div className="error">Weather data not available</div>;

  const forecast = weatherData.forecast.forecastday;

  return (
    <div className='weather-container'>
      <h1 className="weather-header">7-Day Weather Forecast for {weatherData.location.name}</h1>
      <div className='weather-card-wrapper'>
        {forecast.map((day, index) => {
          const isGoodWeather = day.day.condition.text.toLowerCase().includes('clear') || 
                                day.day.condition.text.toLowerCase().includes('sunny');

          return (
            <div key={index} className="weather-card">
              <h2 className="day-name">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
              </h2>
              <p className="condition">{day.day.condition.text}</p>
              <img 
                src={day.day.condition.icon} 
                alt={day.day.condition.text} 
                className="weather-icon" 
              />
              <p className="temperature">
                {day.day.avgtemp_c}°C (High: {day.day.maxtemp_c}°C, Low: {day.day.mintemp_c}°C)
              </p>
              <div className='event-wrapper'>
                <div className='event-box'>
                  <div><strong style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className='green'></span>In-Door
                  </strong></div>
                  <span>Good</span>
                </div>
                <div className='event-box'>
                  <div><strong style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className={isGoodWeather ? 'green' : 'red'}></span>Out-Door
                  </strong></div>
                  <span>{isGoodWeather ? 'Good' : 'Not Good'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Weather;
