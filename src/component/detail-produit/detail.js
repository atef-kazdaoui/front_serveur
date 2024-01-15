import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './detail.css';
import {useParams} from 'react-router-dom';
import {Row, Col, Modal, Button} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

function Detail () {
  const [produit, setProduit] = useState (null);
  const {id} = useParams ();
  const [message, setMessage] = useState ('');
  const [showModal, setShowModal] = useState (false); // State to control modal visibility

  useEffect (
    () => {
      axios
        .get (`http://localhost:5000/produit/find/${id}`)
        .then (response => {
          console.log (response.data);
          setProduit (response.data.client);
        })
        .catch (error => {
          console.log (error);
        });
    },
    [id]
  );

  const addToCart = idProduit => {
    const token = sessionStorage.getItem ('token');
    let data = {
      id_user: null, // Replace null with the actual user ID if the user is logged in
      id_produit: null,
    };

    if (token) {
      const decodedToken = jwt_decode (token);
      const nom = decodedToken.nom;
      const id = decodedToken.id;
      console.log (nom, id);

      // Update the values of id_user and id_produit if necessary
      data.id_user = id;
      data.id_produit = idProduit;
    }

    axios
      .post ('http://localhost:5000/panier/ajouter', data)
      .then (response => {
        const {message, panierItem} = response.data;
        setMessage (`${message} (${panierItem.quantite} fois)`);
        setShowModal (true);

        setTimeout (() => {
          setMessage ('');
          setShowModal (false);
        }, 3000); // Show the modal for 3 seconds
      })
      .catch (error => {
        console.log (error);
      });
  };

  if (!produit) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="product-container"> 
      <Row>
        <Col sm={5} md={5}>
          <div className="product-image">
            {produit && produit.image
              ? <img
                  src={`http://localhost:5000/images/${produit.image}`}
                  alt={produit.nom_produit}
                />
              : null}
          </div>
        </Col>
        <Col sm={7} md={7}>
          <div className="product-info">
            <h2>{produit.nom_produit}</h2>
            <p>{produit.description_produit}</p>
            {sessionStorage.getItem ('token') &&
              <div>
                <button id="atef" onClick={() => addToCart (produit.idproduit)}>
                  <h4>Ajouter au panier</h4>
                </button>
              </div>}
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal (false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal (false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Detail;
