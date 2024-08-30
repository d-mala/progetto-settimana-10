import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

function ErrorAlert({ message, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <Toast
      show={show}
      onClose={handleClose}
      delay={5000}
      autohide
      className="position-fixed top-0 end-0 m-3"
      style={{ zIndex: 1000 }}
    >
      <Toast.Header>
        <strong className="me-auto">Errore</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ErrorAlert;