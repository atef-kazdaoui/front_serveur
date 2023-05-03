import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Affclient.css'
const UserTable = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
 //fonction pour donner access admin
  const handleacces=(client) =>{
    axios.patch(`http://localhost:5000/users/access/${client.iduser}`)
    .then(response=>{
    console.log(response.data) 
    console.log("acces admin donner");
     window.location.reload();
    })
    .catch(error=>{
    console.log(error);
    })
   }
  const handledelete = (client) => {
    axios.delete(`http://localhost:5000/users/delete/${client.iduser}`)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleupdate = (id) => {
    navigate(`/updateclient/${id}`);
  }

    useEffect(() => {
        axios.get('http://localhost:5000/users/findall')
          .then(response => {
            setClients(response.data);
          })
          .catch(error => {
            console.log(error);
          });
          
    }, []);
  return (
    <div className='tableau-client'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Adresse e-mail</th>
          <th>Numéro de téléphone</th>
          <th>image</th>
          <th>modifier</th>
          <th>supprimer</th>
        </tr>
      </thead>
      <tbody>
  {clients.client && clients.client.map(client => (
    <tr key={client.iduser}>
      <td>{client.nom}</td>
      <td>{client.prenom}</td>
      <td>{client.adresse_email}</td>
      <td>{client.numero_telephone}</td>
      <td><img src={"http://localhost:5000/images/"+client.image} alt="produit" width="100" height="100" /></td>
      <td><button type="button" class="btn btn-primary" onClick={() => handleupdate(client.iduser)}>modifier</button>
</td>
      <td><button type="button" class="btn btn-danger" onClick={() => handledelete(client)}>supprimer</button></td>
      <td><button type="button" class="btn btn-danger" onClick={() => handleacces(client)}>donner acces admin</button></td>
      
    </tr>
  ))}
</tbody>
    </Table>
    </div>
  );
};
export default UserTable;

