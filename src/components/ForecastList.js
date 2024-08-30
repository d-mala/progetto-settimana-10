import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function ForecastList({ forecast }) {
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getDayOfWeek = (date) => {
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    return days[new Date(date).getDay()];
  };

  const groupedForecast = forecast.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date] && Object.keys(acc).length < 7) {
      acc[date] = item;
    }
    return acc;
  }, {});

  return (
    <Card className="transparent-inner-card mt-4 slide-in">
      <Card.Body className="p-4">
        <h3 className="mb-4 text-center">Previsioni per i prossimi giorni</h3>
        <Row className="justify-content-center">
          {Object.values(groupedForecast).map((day, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-3">
              <Card className="h-100 shadow-sm day-card smooth-transition">
                <Card.Body className="text-center p-2">
                  <p className="fw-bold mb-1">{getDayOfWeek(day.dt_txt)}</p>
                  <img src={getWeatherIcon(day.weather[0].icon)} alt={day.weather[0].description} className="mb-2" style={{ width: '50px', height: '50px' }} />
                  <p className="mb-0 fw-bold">{Math.round(day.main.temp)}°C</p>
                  <p className="small text-muted">{day.weather[0].description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ForecastList;