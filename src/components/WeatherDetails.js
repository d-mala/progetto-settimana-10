import React from 'react';

function WeatherDetails({ currentWeather }) {
  return (
    <div className="weather-details">
      <p><strong>Percepita:</strong> {Math.round(currentWeather.main.feels_like)}°C</p>
      <p><strong>Umidità:</strong> {currentWeather.main.humidity}%</p>
      <p><strong>Vento:</strong> {currentWeather.wind.speed} m/s</p>
      <p><strong>Pressione:</strong> {currentWeather.main.pressure} hPa</p>
      <p><strong>Visibilità:</strong> {currentWeather.visibility / 1000} km</p>
    </div>
  );
}

export default WeatherDetails;