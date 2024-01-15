import React, { useState, useEffect } from 'react';
import './RDV.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RDV() {
  const [message, setMessage] = useState('');
  const [heuresMinutesList, setHeuresMinutesList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get('http://149.56.13.47:5000/rendez-vous/find')
      .then(res => {
        console.log(res.data); // Ajout pour voir la structure de la réponse
        if (res.data && res.data.heuresMinutesList) {
          setHeuresMinutesList(res.data.heuresMinutesList);
        } else {
          console.error("Réponse malformée :", res);
        }
      })
      .catch(error => {
        console.log("Erreur de requête :", error);
      });
  }, []);

  const handleReservation = (id_rendez_vous) => {
    const rendezVousData = {
      id_rendez_vous: id_rendez_vous,

    };
  console.log(id_rendez_vous);
    axios
      .post(`http://149.56.13.47:5000/rendez-vous/ajouter/${id}`, rendezVousData)
      .then(res => {
        console.log(res.data);
        setMessage('Rendez-vous pris avec succès.');
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response.data);
        setMessage('Erreur lors de la prise de rendez-vous.');
      });
  };

  return (
    <>
      <div className="container-reserverrdv">
        <div className="scroll-container-reserverrdv">
          <h3 style={{ color: 'black' }}>Rendez-vous disponibles</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Heure</th>
                <th>Minute</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {heuresMinutesList.map(rendezVous => (
                <tr key={`${rendezVous.id_rendez_vous}`}>
                  <td>{`${rendezVous.annee}-${rendezVous.mois}-${rendezVous.jour}`}</td>
                  <td>{`${rendezVous.heure}`}</td>
                  <td>{rendezVous.minute}</td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={() =>
                        handleReservation(
                          rendezVous.id_rendez_vous,
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
    </>
  );
}

export default RDV;
