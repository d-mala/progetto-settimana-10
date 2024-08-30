import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastList from '../components/ForecastList';

const mockForecast = [
  {
    dt_txt: '2023-05-01 12:00:00',
    weather: [{ icon: '01d', description: 'cielo sereno' }],
    main: { temp: 25 }
  },
  // ... altri giorni di previsione
];

test('renders ForecastList component', () => {
  render(<ForecastList forecast={mockForecast} />);
  
  expect(screen.getByText('Previsioni per i prossimi 7 giorni')).toBeInTheDocument();
  expect(screen.getByText('25°C')).toBeInTheDocument();
  expect(screen.getByText('cielo sereno')).toBeInTheDocument();
});