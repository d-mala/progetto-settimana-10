import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SearchForm from './SearchForm';
import CurrentWeather from './CurrentWeather';
import ForecastList from './ForecastList';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';
import '../styles/WeatherApp.css';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const PEXELS_API_URL = 'https://api.pexels.com/v1/search';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  const fetchWeather = async (query) => {
    if (!API_KEY || API_KEY === 'TUA_CHIAVE_API') {
      setError('Errore: API key non valida. Assicurati di aver configurato correttamente il file .env');
      setWeather(null);
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setIsError(false);

    try {
      let url = `${WEATHER_API_URL}?appid=${API_KEY}&units=metric&lang=it&cnt=40`;
      if (typeof query === 'string') {
        url += `&q=${query}`;
      } else if (typeof query === 'object' && query.lat && query.lon) {
        url += `&lat=${query.lat}&lon=${query.lon}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Errore nel recupero dei dati meteo');
      }
      const data = await response.json();
      setWeather(data);
      setError('');
      setIsError(false);
      fetchBackgroundImage(data.city.name, data.city.country);
    } catch (err) {
      setWeather(null);
      setError(err.message);
      setIsError(true);
      setBackgroundImage('');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBackgroundImage = async (cityName, countryName) => {
    try {
      const query = `${cityName} ${countryName}`.trim();
      const response = await fetch(`${PEXELS_API_URL}?query=${query}&per_page=15`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.photos.length);
        setBackgroundImage(data.photos[randomIndex].src.original);
      } else {
        fetchCloudImage();
      }
    } catch (error) {
      fetchCloudImage();
    }
  };

  const fetchCloudImage = async () => {
    try {
      const response = await fetch(`${PEXELS_API_URL}?query=clouds&per_page=15`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.photos.length);
        setBackgroundImage(data.photos[randomIndex].src.original);
      } else {
        setBackgroundImage('');
      }
    } catch (error) {
      setBackgroundImage('');
    }
  };

  const handleCitySearch = (city, country) => {
    if (!city.trim()) {
      setError("Per favore, inserisci il nome di una località.");
      return;
    }

    let query = city.trim();
    if (country) {
      query += `,${country.trim()}`;
    }
    fetchWeather(query);
    setError('');
  };

  const handleLocationSearch = (lat, lon) => {
    fetchWeather({ lat, lon });
    setError('');
  };

  const getRandomCloudImage = () => {
    fetchCloudImage();
  };

  const handleErrorClose = () => {
    setError('');
  };

  const handleBackgroundLoad = () => {
    setIsBackgroundLoaded(true);
  };

  const getBackgroundStyle = () => {
    if (isError) {
      return {
        background: 'linear-gradient(to right, #FF416C, #FF4B2B)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};
  };

  useEffect(() => {
    const getLocationAndFetchWeather = () => {
      setIsLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            handleLocationSearch(latitude, longitude);
          },
          (error) => {
            setError("Impossibile ottenere la posizione. Inserisci manualmente una città.");
            setIsLoading(false);
            getRandomCloudImage();
          }
        );
      } else {
        setError("La geolocalizzazione non è supportata dal tuo browser. Inserisci manualmente una città.");
        setIsLoading(false);
        getRandomCloudImage();
      }
    };

    getLocationAndFetchWeather();
  }, []);

  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = handleBackgroundLoad;
    }
  }, [backgroundImage]);

  return (
    <div 
      className={`weather-app fade-in ${isBackgroundLoaded ? 'background-loaded' : ''}`} 
      style={getBackgroundStyle()}
    >
      <div className={`background-overlay ${isBackgroundLoaded ? 'loaded' : ''}`}></div>
      <ErrorAlert message={error} onClose={handleErrorClose} />
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={11} md={10} lg={8} xl={7} xxl={6}>
            <Card className="transparent-card shadow-lg">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h1 className="display-4 fw-bold">EpicMeteo</h1>
                  <p className="lead">Scopri il meteo in tempo reale per qualsiasi città nel mondo.</p>
                </div>
                <SearchForm 
                  onSearch={handleCitySearch} 
                  onLocationSearch={handleLocationSearch}
                />
                {isLoading && <LoadingSpinner />}
                {!isLoading && weather && (
                  <>
                    <CurrentWeather currentWeather={weather.list[0]} city={weather.city} />
                    <ForecastList forecast={weather.list} />
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WeatherApp;