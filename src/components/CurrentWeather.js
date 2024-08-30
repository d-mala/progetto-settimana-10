import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CurrentWeather({ currentWeather, city }) {
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('it-IT', options);
  };

  const WeatherDetail = ({ icon, label, value }) => (
    <div className="d-flex align-items-center mb-2">
      <i className={`bi ${icon} me-2`}></i>
      <span>{label}:</span>
      <span className="ms-auto fw-bold">{value}</span>
    </div>
  );

  return (
    <Card className="current-weather-card mb-4 slide-in">
      <Card.Body className="p-4 text-white">
        <h2 className="fs-1 fw-bold mb-1">{city.name}, {city.country}</h2>
        <p className="fs-5 mb-4">{getCurrentDate()}</p>
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img 
              src={getWeatherIcon(currentWeather.weather[0].icon)} 
              alt={currentWeather.weather[0].description} 
              className="weather-icon-large mb-3"
            />
            <h1 className="display-2 fw-bold mb-0">{Math.round(currentWeather.main.temp)}°C</h1>
            <p className="fs-4 fst-italic">{currentWeather.weather[0].description}</p>
          </Col>
          <Col md={6}>
            <Card className="current-weather-details-card less-transparent">
              <Card.Body>
                <h4 className="mb-3">Dettagli meteo</h4>
                <WeatherDetail 
                  icon="bi-thermometer-half"
                  label="Percepita"
                  value={`${Math.round(currentWeather.main.feels_like)}°C`}
                />
                <WeatherDetail 
                  icon="bi-droplet-fill"
                  label="Umidità"
                  value={`${currentWeather.main.humidity}%`}
                />
                <WeatherDetail 
                  icon="bi-wind"
                  label="Vento"
                  value={`${currentWeather.wind.speed} m/s`}
                />
                <WeatherDetail 
                  icon="bi-speedometer2"
                  label="Pressione"
                  value={`${currentWeather.main.pressure} hPa`}
                />
                <WeatherDetail 
                  icon="bi-eye-fill"
                  label="Visibilità"
                  value={`${currentWeather.visibility / 1000} km`}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CurrentWeather;