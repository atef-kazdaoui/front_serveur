import React, { useState } from 'react';
import './RDV.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RDV() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    const rendezVousData = {
      id_user: id, // Remplacez la valeur statique par votre logique pour obtenir l'ID de l'utilisateur
      date_diponible: date + ' ' + time,
    };

    axios
      .post('http://localhost:5000/rendez-vous/ajouter', rendezVousData)
      .then((res) => {
        console.log(res.data);
        setMessage('Rendez-vous pris avec succès.');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
        setMessage('Erreur lors de la prise de rendez-vous.');
      });
  };

  return (
    <div className="container">
      <h2>Prise de rendez-vous</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="dateInput">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="timeInput">
          <Form.Label>Heure</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='button'>
          Réserver
        </Button>

        {message && <p className="message">{message}</p>}
      </Form>
    </div>
  );
}

export default RDV;
