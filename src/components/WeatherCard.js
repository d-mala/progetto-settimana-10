import React from 'react';
import { Card } from 'react-bootstrap';
import ForecastList from './ForecastList';
import WeatherDetails from './WeatherDetails';

function WeatherCard({ weather }) {
  const getBackgroundColor = (temp) => {
    if (temp < 10) return '#e3f2fd';
    if (temp < 20) return '#bbdefb';
    if (temp < 30) return '#ffccbc';
    return '#ffab91';
  };

  return (
    <Card className="mt-3 shadow weather-card">
      <Card.Body style={{ backgroundColor: getBackgroundColor(weather.list[0].main.temp) }}>
        <Card.Title className="text-center mb-4">
          <h2 className="city-title">{weather.city.name}, {weather.city.country}</h2>
          <h1 className="current-temp">{Math.round(weather.list[0].main.temp)}°C</h1>
          <p className="weather-description">{weather.list[0].weather[0].description}</p>
        </Card.Title>
        <ForecastList forecast={weather.list.slice(0, 5)} />
        <WeatherDetails currentWeather={weather.list[0]} />
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;