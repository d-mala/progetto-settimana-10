import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner';

test('renders LoadingSpinner component', () => {
  render(<LoadingSpinner />);
  
  expect(screen.getByRole('status')).toBeInTheDocument();
  expect(screen.getByText('Caricamento...')).toBeInTheDocument();
});