import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentWeather from '../components/CurrentWeather';

const mockWeatherData = {
  weather: [{ icon: '01d', description: 'cielo sereno' }],
  main: { temp: 25, feels_like: 26, humidity: 50, pressure: 1013 },
  wind: { speed: 3.5 },
  visibility: 10000
};

const mockCity = {
  name: 'Roma',
  country: 'IT'
};

test('renders CurrentWeather component', () => {
  render(<CurrentWeather currentWeather={mockWeatherData} city={mockCity} />);
  
  expect(screen.getByText('Roma, IT')).toBeInTheDocument();
  expect(screen.getByText('25°C')).toBeInTheDocument();
  expect(screen.getByText('cielo sereno')).toBeInTheDocument();
  expect(screen.getByAltText('cielo sereno')).toBeInTheDocument();
  
  // Verifica i dettagli meteo
  expect(screen.getByText('Percepita:')).toBeInTheDocument();
  expect(screen.getByText('26°C')).toBeInTheDocument();
  expect(screen.getByText('Umidità:')).toBeInTheDocument();
  expect(screen.getByText('50%')).toBeInTheDocument();
  expect(screen.getByText('Vento:')).toBeInTheDocument();
  expect(screen.getByText('3.5 m/s')).toBeInTheDocument();
  expect(screen.getByText('Pressione:')).toBeInTheDocument();
  expect(screen.getByText('1013 hPa')).toBeInTheDocument();
  expect(screen.getByText('Visibilità:')).toBeInTheDocument();
  expect(screen.getByText('10 km')).toBeInTheDocument();
});