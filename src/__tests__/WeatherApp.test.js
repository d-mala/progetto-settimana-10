import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WeatherApp from '../components/WeatherApp';

// Mock delle funzioni fetch globali
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('renders WeatherApp component', async () => {
  render(<WeatherApp />);
  
  // Verifica che il titolo sia presente
  expect(screen.getByText('EpicMeteo')).toBeInTheDocument();
  
  // Verifica che il sottotitolo sia presente
  expect(screen.getByText('Scopri il meteo in tempo reale per qualsiasi città nel mondo.')).toBeInTheDocument();
  
  // Verifica che il form di ricerca sia presente
  expect(screen.getByPlaceholderText('Inserisci il nome della città')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Codice paese (opzionale)')).toBeInTheDocument();
  
  // Attendi che il caricamento sia completato
  await waitFor(() => expect(fetch).toHaveBeenCalled());
});

// Aggiungi altri test per coprire nuove funzionalità come la geolocalizzazione e il caricamento dell'immagine di sfondo