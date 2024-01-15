import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flitre.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductList() {
  const [produits, setProduits] = useState([]);
  const [allproduits, setAllProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorieId, setCategorieId] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/categories/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (categorieId === '' || categorieId === 'All') {
      axios
        .get('http://localhost:5000/produit/find')
        .then((response) => {
          const slicedProducts = response.data.produit.slice(startIndex, endIndex);
          setProduits(slicedProducts);
          setAllProduits(response.data.produit);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`http://localhost:5000/produit/filtre/${categorieId}`)
        .then((response) => {
          const slicedProducts = response.data.client.slice(startIndex, endIndex);
          setProduits(slicedProducts);
          setAllProduits(response.data.client);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categorieId, currentPage, itemsPerPage]);

  const handleChange = (event) => {
    const value = event.target.value;
    setCurrentPage(1); // Réinitialiser la page à 1 lorsque la catégorie change
    setCategorieId(value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const addToCart = (idProduit) => {
    const token = sessionStorage.getItem('token');
    let data = {
      id_user: null, // Remplacez null par l'ID de l'utilisateur s'il est connecté
      id_produit: idProduit, // Ajoutez l'ID du produit ici
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

    axios
      .post('http://localhost:5000/panier/ajouter', data)
      .then((response) => {
        const { message, panierItem } = response.data;
        setMessage(`${message} (${panierItem.quantite} fois)`);
        setShowModal(true);

        setTimeout(() => {
          setMessage('');
          setShowModal(false);
        }, 3000); // Délai de 3000 millisecondes (3 secondes)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const savoirplus = (id) => {
    navigate(`/produit_detail/${id}`);
  };

  const totalPages = Math.ceil(allproduits.length / itemsPerPage);
  const pagination = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <div>
        <label htmlFor="categorie-select" style={{ color: 'black' }}>
          Choose a category:
        </label>
        <div className="col-2">
          <select
            id="categorie-select"
            className="form-select"
            onChange={handleChange}
            value={categorieId}
          >
            <option value="All">--Sélectionnez une catégorie--</option>
            {categories.categorie &&
              categories.categorie.map((categorie) => (
                <option
                  key={categorie.id}
                  value={categorie.idcategorie}
                  className="text-capitalize"
                >
                  {categorie.nom_categorie}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="product-list">
        {produits &&
          produits.map((produit) => (
            <div className="product-card" key={produit.id_produit}>
              <div className="product-image">
                <img
                  src={`http://localhost:5000/images/${produit.image}`}
                  alt={produit.nom_produit}
                />
              </div>
              <div className="product-info">
                <h4>{produit.nom_produit}</h4>
                <h5>Price: €{produit.prix_produit}</h5>
                {sessionStorage.getItem('token') && (
                  <div>
                    <button id="atef" onClick={() => addToCart(produit.idproduit)}>
                      <h4>Ajouter au panier</h4>
                    </button>
                  </div>
                )}
                <div>
                  <button id="atef" onClick={() => savoirplus(produit.idproduit)}>
                    <h4>Savoir plus</h4>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="pagination-container">
        <div className="pagination">
          {pagination.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
        
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductList;
