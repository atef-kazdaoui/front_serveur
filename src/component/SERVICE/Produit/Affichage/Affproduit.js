import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Affichage/Affproduit.css";

function Affproduit() {
    const [produits, setProduits] = useState([]);
    const navigate = useNavigate();
    const handledelete = (produit) => {
        axios.delete(`http://149.56.13.47:5000/produit/delete/${produit.idproduit}`)
          .then(response => {
            console.log(response.data);
           
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      }
      const handleupdate = (id) => {
        navigate(`/updateproduit/${id}`);
      }
    useEffect(() => {
        axios.get('http://149.56.13.47:5000/produit/find')
          .then(response => {
            setProduits(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    return (
  <>
  <div  className='titre-produit'>
    <h2>Nos produits</h2>

  </div>
    
    <div className="container-listeproduits">
    
    
    <div className="liste-produits">
      
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Nom</th>
       
          <th>prix</th>
          <th>nombre</th>
          <th> image</th>
          <th>modifier</th>
          <th>supprimer</th>
          </tr>
        </thead>
        <tbody>
        {produits.produit && produits.produit.map(produit => (
    <tr key={produit.idproduit}>
      <td>{produit.nom_produit}</td>
     
      <td>{produit.prix_produit}</td>
      <td>{produit.nombre_produit}</td>
      <td><img src={"http://149.56.13.47:5000/images/"+produit.image} alt="produit" width="80" height="100" /></td>

      <td><button type="button" class="btn btn-dark" onClick={() => handleupdate(produit.idproduit)}>modifier</button>
</td>
      <td><button type="button" class="btn btn-danger"  onClick={() => handledelete(produit)}>supprimer</button></td>
      </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
    </>
  )
}

export default Affproduit