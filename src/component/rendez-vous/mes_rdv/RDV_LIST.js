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
        console.log("res", res.data);
        console.log("rendezVousList", rendezVousList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <h2>Liste des rendez-vous</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Rendez-vous</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rendezVousList.map((rendezVous) => (
            <tr key={rendezVous.id_rendez_vous}>
              <td>{rendezVous.id_rendez_vous}</td>
              <td>{rendezVous.date_diponible}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RDV_LIST;
