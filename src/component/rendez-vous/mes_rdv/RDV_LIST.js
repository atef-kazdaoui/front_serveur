import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../mes_rdv/RDV_list.css'; // Import the CSS file for this component

function RDV_LIST() {
  const [rendezVousList, setRendezVousList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://149.56.13.47:5000/rendez-vous/find/${id}`)
      .then((res) => {
        setRendezVousList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div className="container-mesrdv">
        <div className="scroll-container-mesrdv">
          <h3 className="section-title" style={{ color: 'black' }}>
            Vos rendez-vous
          </h3>
          <Table striped bordered hover responsive className="rdv-table">
            <thead>
              <tr>
                <th>Année</th>
                <th>Mois</th>
                <th>Jour</th>
                <th>Heure</th>
                <th>Minute</th>
              </tr>
            </thead>
            <tbody>
              {rendezVousList.map((rendezVous) => (
                <tr key={rendezVous.id_rendez_vous}>
                  <td>{rendezVous.annee}</td>
                  <td>{rendezVous.mois}</td>
                  <td>{rendezVous.jour}</td>
                  <td>{rendezVous.heure}</td>
                  <td>{rendezVous.minute}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default RDV_LIST;
