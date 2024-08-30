import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorAlert from '../components/ErrorAlert';

test('renders ErrorAlert component', () => {
  const mockClose = jest.fn();
  render(<ErrorAlert message="Errore di test" onClose={mockClose} />);
  
  expect(screen.getByText('Errore di test')).toBeInTheDocument();
});

test('calls onClose when close button is clicked', () => {
  const mockClose = jest.fn();
  render(<ErrorAlert message="Errore di test" onClose={mockClose} />);
  
  const closeButton = screen.getByLabelText('Close');
  fireEvent.click(closeButton);
  
  expect(mockClose).toHaveBeenCalled();
});