import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

test('renders SearchForm component', () => {
  const mockSearch = jest.fn();
  const mockLocationSearch = jest.fn();
  
  render(<SearchForm onSearch={mockSearch} onLocationSearch={mockLocationSearch} />);
  
  expect(screen.getByPlaceholderText('Inserisci il nome della città')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Codice paese (opzionale)')).toBeInTheDocument();
  expect(screen.getByText('Cerca')).toBeInTheDocument();
  expect(screen.getByText('Usa la mia posizione')).toBeInTheDocument();
});

test('calls onSearch when form is submitted', () => {
  const mockSearch = jest.fn();
  const mockLocationSearch = jest.fn();
  
  render(<SearchForm onSearch={mockSearch} onLocationSearch={mockLocationSearch} />);
  
  const cityInput = screen.getByPlaceholderText('Inserisci il nome della città');
  const countryInput = screen.getByPlaceholderText('Codice paese (opzionale)');
  const searchButton = screen.getByText('Cerca');
  
  fireEvent.change(cityInput, { target: { value: 'Roma' } });
  fireEvent.change(countryInput, { target: { value: 'IT' } });
  fireEvent.click(searchButton);
  
  expect(mockSearch).toHaveBeenCalledWith('Roma', 'IT');
});

test('calls onLocationSearch when location button is clicked', () => {
  const mockSearch = jest.fn();
  const mockLocationSearch = jest.fn();
  
  render(<SearchForm onSearch={mockSearch} onLocationSearch={mockLocationSearch} />);
  
  const locationButton = screen.getByText('Usa la mia posizione');
  fireEvent.click(locationButton);
  
  expect(mockLocationSearch).toHaveBeenCalled();
});