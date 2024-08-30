import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

function SearchForm({ onSearch, onLocationSearch }) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city, country);
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSearch(latitude, longitude);
        },
        (error) => {
          console.error("Errore nella geolocalizzazione:", error);
          alert("Impossibile ottenere la posizione. Assicurati di aver concesso i permessi di geolocalizzazione.");
        }
      );
    } else {
      alert("La geolocalizzazione non è supportata dal tuo browser.");
    }
  };

  return (
    <Card className="transparent-inner-card mb-4 slide-in">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col xs={12} sm={8}>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome della città"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mb-2 shadow-sm"
                style={{ borderRadius: '20px', height: '50px' }}
                required
              />
            </Col>
            <Col xs={12} sm={4}>
              <Form.Control
                type="text"
                placeholder="Codice paese (opzionale)"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mb-2 shadow-sm"
                style={{ borderRadius: '20px', height: '50px' }}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                className="shadow hover-lift smooth-transition"
                style={{ borderRadius: '25px', height: '60px' }}
                disabled={!city.trim()}
              >
                Cerca
              </Button>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12} className="d-grid">
              <Button 
                variant="outline-secondary" 
                type="button" 
                onClick={handleLocationSearch}
                className="shadow-sm hover-lift smooth-transition"
                style={{ borderRadius: '25px', height: '50px' }}
              >
                <i className="bi bi-geo-alt me-2 rotate-on-hover"></i>Usa la mia posizione
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SearchForm;