import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadingSpinner() {
  return (
    <div className="text-center my-4 fade-in">
      <Spinner animation="border" role="status" className="pulse">
        <span className="visually-hidden">Caricamento...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;