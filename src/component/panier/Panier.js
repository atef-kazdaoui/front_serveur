import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './panier.css';
import carte from './cartebleu.jpg';
import carte2 from './cartebleu2.png';

function Panier() {
  const [panier, setPanier] = useState([]);
  const [produits, setProduits] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantites, setQuantites] = useState([]);
  const [showModal, setShowModal] = useState(false); // État pour afficher/masquer la modale
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/panier/findP/${id}`)
      .then((response) => {
        setPanier(response.data);

        const produitsArray = [];
        let totalPrice = 0;
        const quantitesArray = []; // Nouveau tableau pour stocker les quantités
        response.data.forEach((item) => {
          const idProduit = item.id_produit;

          axios
            .get(`http://localhost:5000/produit/find/${idProduit}`)
            .then((response) => {
              response.data.client['quantite'] = item.quantite;
              produitsArray.push(response.data.client);
              totalPrice +=
                response.data.client.prix_produit * item.quantite;
              quantitesArray.push(item.quantite); // Ajouter la quantité au tableau
              setTotal(totalPrice);
              setProduits(produitsArray);
              setQuantites(quantitesArray); // Définir les quantités
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleConfirmerPanier = () => {
    setShowModal(true); // Afficher la modale lorsque le bouton est cliqué
  };

  const handleModalClose = () => {
    setShowModal(false); // Masquer la modale lorsque l'utilisateur clique sur "Fermer"
  };

  const handlePaiement = () => {
    // Logique de traitement du paiement
    // Ajoutez ici votre code pour gérer le paiement avec les informations de la carte bancaire
    alert('Paiement effectué avec succès !');
    setShowModal(false); // Masquer la modale après le paiement
  };

  const handleViderPanier = () => {
    axios
      .delete(`http://localhost:5000/panier/delete/${id}`)
      .then((response) => {
        alert('Le panier a été vidé avec succès !');
        setPanier([]); // Réinitialise le panier à une liste vide
        setTotal(0); // Réinitialise le total à zéro
        setProduits([]); // Réinitialise la liste des produits à une liste vide
        setQuantites([]); // Réinitialise les quantités à une liste vide
      })
      .catch((error) => {
        console.log(error);
        alert("Une erreur s'est produite lors de la suppression du panier.");
      });
  };

  const handleQuantiteChange = (index, event) => {
    const newQuantites = [...quantites];
    newQuantites[index] = parseInt(event.target.value, 10);
    setQuantites(newQuantites);

    // Recalculate the total based on the updated quantities
    let totalPrice = 0;
    newQuantites.forEach((quantity, i) => {
      const produit = produits[i];
      totalPrice += produit.prix_produit * quantity;
    });
    setTotal(totalPrice);
  };

  return (
    <>
      <div className="panier">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>nom du produit</th>
              <th>prix du produit</th>
              <th>image du produit</th>
              <th>quantite</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit, index) => (
              <tr key={produit.idproduit}>
                <td>{produit.nom_produit}</td>
                <td>{produit.prix_produit}</td>
                <td>
                  <img
                    src={"http://localhost:5000/images/" + produit.image}
                    alt="produit"
                    width="80"
                    height="100"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={quantites[index]}
                    onChange={(event) => handleQuantiteChange(index, event)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">Total</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </Table>
        <Button onClick={handleViderPanier} variant="danger" className="mt-3">
          Vider le panier
        </Button>
        <Button
          onClick={handleConfirmerPanier}
          variant="primary"
          className="mt-3"
        >
          Confirmer le panier et passer au paiement
        </Button>
      </div>

      {/* Modal pour le formulaire de carte bancaire */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Paiement en carte bancaire</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action=" ">
            <div className="paiement">
              <div className="form-group">
                <label>Nom :</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Prénom :</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Numéro de carte :</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>CVC :</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="logo-container">
            <img src={carte} alt="Carte Bleue" className="card-logo" />
            <img src={carte2} alt="Visa" className="card-logo" />
          </div>
          <Button variant="secondary" onClick={handleModalClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handlePaiement}>
            Payer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Panier;
