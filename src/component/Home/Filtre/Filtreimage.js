import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flitre.css';
import jwt_decode from 'jwt-decode';

function ProductList() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorieId, setCategorieId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/categories/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (categorieId !== '') {
      axios.get(`http://localhost:5000/produit/filtre/${categorieId}`)
        .then(response => {
          setProduits(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [categorieId]);

  const handleChange = (event) => {
    const value = event.target.value;
    setCategorieId(value);
  };

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

  useEffect(() => {
    axios.get('http://localhost:5000/produit/find')
      .then(response1 => {
        
        console.log("aaaa"+response1.data);

      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div>
        <label htmlFor="categorie-select">Choose a category:</label>
        <select id="categorie-select" onChange={handleChange}>
          <option value="">--Choisir une catégorie--</option>
          {categories.categorie &&
            categories.categorie.map(categorie => (
              <option key={categorie.id} value={categorie.idcategorie}>
                {categorie.nom_categorie}
              </option>
            ))}
        </select>
      </div>
      <div className="product-list">
        {produits.client &&
          produits.client.map(produit => (
            <div className="product-card" key={produit.id_produit}>
              <img
                src={`http://localhost:5000/images/${produit.image}`}
                alt={produit.nom_produit}
              />
              <div className="product-info">
                <h3>{produit.nom_produit}</h3>
                <p>{produit.description_produit}</p>
                <p>Price: ${produit.prix_produit}</p>
                {sessionStorage.getItem('token') && (
                  <button onClick={() => addToCart(produit.idproduit)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProductList;
