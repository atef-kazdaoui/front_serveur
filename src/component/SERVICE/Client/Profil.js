import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Profil = () => {
  const [client, setClient] = useState();
  const { id } = useParams();

  useEffect(() => { // la fonction de rappel useEffect doit être correctement définie
    
    axios.get(`http://localhost:5000/users/find/${id}`)
      .then(response => {
        if(!client){
            setClient(response.data.client); 
        }
        console.log(response.data)
        console.log('client' ,client)
      })
      .catch(error => {
        console.log(error);
      });
  }, [id,client]);
if (!client){ return null;}
  return (
    <>
    
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Adresse e-mail</th>
          <th>Numéro de téléphone</th>
          <th>image</th>
          
        </tr>
      </thead>
      <tbody>
  
    <tr key={client.iduser}>
      <td>{client.nom}</td>
      <td>{client.prenom}</td>
      <td>{client.adresse_email}</td>
      <td>{client.numero_telephone}</td>
      <td><img src={"http://localhost:5000/images/"+client.image} alt="produit" width="100" height="100" /></td>
    </tr>
  
</tbody>
    </Table>


 </>

  );
}

export default Profil;
