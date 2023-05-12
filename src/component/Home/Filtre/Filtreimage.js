import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Flitre.css'

function ProductList() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorieId, setCategorieId] = useState('');

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
  }

  const addToCart = (produit) => {
    let cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];

    let produitAlreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === produit.id_produit) {
        produitAlreadyInCart = true;
        item.count++;
      }
    });

    if (!produitAlreadyInCart) {
      cartItems.push({ ...produit, count: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <div>
      <div>
        <label htmlFor="categorie-select">Choose a category:</label>
        <select id="categorie-select" onChange={handleChange}>
          <option value="">--Choisir une catégorie--</option>
          {categories.categorie &&
            categories.categorie.map((categorie) => (
              <option key={categorie.id} value={categorie.idcategorie}>
                {categorie.nom_categorie}
              </option>
            ))}
        </select>
      </div>
      <div className="product-list">
        {produits.client &&
          produits.client.map((produit) => (
            <div className="product-card" key={produit.id_produit}>
              <img
                src={`http://localhost:5000/images/${produit.image}`}
                alt={produit.nom_produit}
              />
              <div className="product-info">
                <h3>{produit.nom_produit}</h3>
                <p>{produit.description_produit}</p>
                <p>Price: ${produit.prix_produit}</p>
                <button onClick={() => addToCart(produit)}>Add to cart</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
