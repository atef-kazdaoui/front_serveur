import React, { useState, useEffect } from 'react';
import './RDV.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RDV() {
  const [message, setMessage] = useState('');
  const [rendezVousDisponibles, setRendezVousDisponibles] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:5000/rendez-vous/find')
      .then((res) => {
        console.log(res.data.rendezVousDisponibles);
        setRendezVousDisponibles(res.data.rendezVousDisponibles);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const formatTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return `${hours}:${minutes}`;
  };

  const handleReservation = (date, id_rendez_vous) => {
    const rendezVousData = {
      id_user: id,
      id_rendez_vous: id_rendez_vous,
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

      <div className="scroll-container">
        <h3>Rendez-vous disponibles</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rendezVousDisponibles.map((rendezVous) => (
              <tr key={rendezVous.id_rendez_vous}>
                <td>{rendezVous.date_diponible.split('T')[0]}</td>
                <td>{formatTime(rendezVous.date_diponible)}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleReservation(
                        rendezVous.date_diponible,
                        rendezVous.id_rendez_vous
                      )
                    }
                  >
                    Réserver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RDV;
