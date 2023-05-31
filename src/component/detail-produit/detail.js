import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './detail.css';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

function Detail() {
  const [produit, setProduit] = useState(null);
  const { id } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log("ici", id);
    axios.get(`http://localhost:5000/produit/find/${id}`)
      .then(response => {
        console.log(response.data);
        setProduit(response.data.client);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const addToCart = (idProduit) => {
    const token = sessionStorage.getItem('token');
    let data = {
      id_user: null, // Remplacez null par l'ID de l'utilisateur s'il est connecté
      id_produit: null,
    };

    if (token) {
      const decodedToken = jwt_decode(token);
      const nom = decodedToken.nom;
      const id = decodedToken.id;
      console.log(nom, id);

      // Mettre à jour les valeurs de id_user et id_produit si nécessaire
      data.id_user = id;
      data.id_produit = idProduit;
    }

    axios.post('http://localhost:5000/panier/ajouter', data)
      .then(response => {
        const { message, panierItem } = response.data;
        setMessage(`${message} (${panierItem.quantite} fois)`);

        setTimeout(() => {
          setMessage('');
        }, 3000); // Délai de 3000 millisecondes (3 secondes)
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (!produit) {
    return <div>Loading...</div>; // Affiche un message de chargement pendant la récupération des données
  }

  return (
    <div className="product-container">
      <div className="product-image">
        {produit && produit.image ? (
          <img src={`http://localhost:5000/images/${produit.image}`} alt={produit.nom_produit} />
        ) : null}
      </div>
      <div className="product-info">
        <h2>{produit.nom_produit}</h2>
        <p>{produit.description_produit}</p>
        {sessionStorage.getItem('token') && (
                  <div>
                    <Button onClick={() => addToCart(produit.id_produit)}>Ajouter au panier</Button>
                   
                  </div>
                )}

        
      </div>
    </div>
  );
}

export default Detail;
