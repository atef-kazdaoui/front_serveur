import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function RDV_LIST() {
  const [rendezVousList, setRendezVousList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/rendez-vous/mes_rendez_vous/${id}`)
      .then((res) => {
        setRendezVousList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container">
      <h2>Prise de rendez-vous</h2>

      <div className="scroll-container">
        <h3>Vos rendez-vous</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
          
            </tr>
          </thead>
          <tbody>
            {rendezVousList.map((rendezVous) => (
              <tr key={rendezVous.id_rendez_vous}>
                <td>{rendezVous.date_diponible.split('T')[0]}</td>
                <td>{rendezVous.date_diponible.split('T')[1]}</td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default RDV_LIST;
