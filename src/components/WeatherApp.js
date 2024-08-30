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
    console.log('fetchWeather chiamata con query:', query);
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
      console.log('URL per la richiesta meteo:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Errore nel recupero dei dati meteo');
      }
      const data = await response.json();
      console.log('Dati meteo ricevuti:', data);
      setWeather(data);
      setError('');
      setIsError(false);
      console.log('Chiamata a fetchBackgroundImage con:', data.city.name, data.city.country);
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
    console.log('fetchBackgroundImage chiamata con:', cityName, countryName);
    try {
      const query = `${cityName} ${countryName}`.trim();
      const response = await fetch(`${PEXELS_API_URL}?query=${query}&per_page=15`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      const data = await response.json();
      console.log(`Dati immagine ricevuti per "${query}":`, data);
      if (data.photos && data.photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.photos.length);
        console.log(`Impostazione nuova immagine di sfondo per "${query}"`);
        setBackgroundImage(data.photos[randomIndex].src.original);
      } else {
        console.log('Nessuna immagine trovata per la località, ricerca di immagini di nuvole');
        fetchCloudImage();
      }
    } catch (error) {
      console.error(`Errore nel recupero dell'immagine di sfondo:`, error);
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
        console.log('Impostazione immagine di nuvole come sfondo');
        setBackgroundImage(data.photos[randomIndex].src.original);
      } else {
        console.log('Nessuna immagine di nuvole trovata, impostazione sfondo vuoto');
        setBackgroundImage('');
      }
    } catch (error) {
      console.error('Errore nel recupero dell\'immagine di nuvole:', error);
      setBackgroundImage('');
    }
  };

  const handleCitySearch = (city, country) => {
    console.log('handleCitySearch chiamata con:', city, country);
    let query = city;
    if (country) {
      query += `,${country}`;
    }
    fetchWeather(query);
    setError('');
  };

  const handleLocationSearch = (lat, lon) => {
    console.log('handleLocationSearch chiamata con:', lat, lon);
    fetchWeather({ lat, lon });
    setError('');
    // Rimuoviamo la chiamata a fetchBackgroundImage da qui
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
      console.log('getLocationAndFetchWeather chiamata');
      setIsLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Posizione ottenuta:', position.coords);
            const { latitude, longitude } = position.coords;
            handleLocationSearch(latitude, longitude);
            // Rimuoviamo la chiamata a fetchBackgroundImage da qui
          },
          (error) => {
            console.error("Errore nella geolocalizzazione:", error);
            setError("Impossibile ottenere la posizione. Inserisci manualmente una città.");
            setIsLoading(false);
            getRandomCloudImage();
          }
        );
      } else {
        console.log('Geolocalizzazione non supportata');
        setError("La geolocalizzazione non è supportata dal tuo browser. Inserisci manualmente una città.");
        setIsLoading(false);
        getRandomCloudImage();
      }
    };

    getLocationAndFetchWeather();
  }, []);

  useEffect(() => {
    console.log('useEffect per backgroundImage chiamato con:', backgroundImage);
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = handleBackgroundLoad;
    }
  }, [backgroundImage]);

  return (
    <div 
      className={`weather-app fade-in ${isBackgroundLoaded ? 'background-loaded' : ''}`} 
      style={{
        ...getBackgroundStyle(),
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
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