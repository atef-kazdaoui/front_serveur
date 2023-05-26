import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RDV_LIST() {
  const [rendezVousList, setRendezVousList] = useState([]);
  const { id } = useParams();
  const id_user = id;
  
  useEffect(() => {
    axios
      .get('http://localhost:5000/rendez-vous/mes_rendez_vous', {
        data: { id_user: id_user }
      })
      .then((res) => {
           
        console.log(res.data);
          
              setRendezVousList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <h2>Liste des rendez-vous</h2>
      <table>
        <thead>
          <tr>
            <th>ID Rendez-vous</th>
            <th>Date</th>
            <th>Heure</th>
          </tr>
        </thead>
        <tbody>
          {rendezVousList.map((rendezVous) => (
            <tr key={rendezVous.id_rendez_vous}>
              <td>{rendezVous.id_rendez_vous}</td>
              <td>{rendezVous.date}</td>
              <td>{rendezVous.heure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RDV_LIST;
