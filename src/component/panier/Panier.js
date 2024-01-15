import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './panier.css';

function Panier() {
  const [panierItems, setPanierItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantites, setQuantites] = useState([]);
  const [produit_detail, setProduit_detail] = useState([]);
  const [showPanierModal, setShowPanierModal] = useState(false);
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const { id } = useParams();

  const handleViderPanier = () => {
    setShowPanierModal(true);
  };

  const handleModalClose = () => {
    setShowPanierModal(false);
    setShowPaiementModal(false);
  };

  const handleModalConfirm = () => {
    axios
      .delete(`http://149.56.13.47:5000/panier/delete/${id}`)
      .then((response) => {
        alert('Le panier a été vidé avec succès !');
        setShowPanierModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirmerPanier = () => {
    setShowPaiementModal(true);
  };

  const handlePaiement = () => {
    // Logique de traitement du paiement
    alert('Paiement effectué avec succès !');
    setShowPaiementModal(false);
  };

  const handleQuantiteChange = (index, event) => {
    const newQuantites = [...quantites];
    newQuantites[index] = parseInt(event.target.value, 10);
    setQuantites(newQuantites);
  };

  useEffect(() => {
    axios
      .get(`http://149.56.13.47:5000/panier/findP/${id}`)
      .then((response) => {
        const panierData = response.data;
        if (panierData && panierData.length > 0) {
          const premierPanier = panierData[0];
          const panierItemsArray = premierPanier.PanierItems;
          if (Array.isArray(panierItemsArray)) {
            setPanierItems(panierItemsArray);

            const quantitesArray = panierItemsArray.map((item) => item.quantite);
            setQuantites(quantitesArray);

            const id_produits = panierItemsArray.map((item) => item.id_produit);

            // Utilisez Promise.all pour attendre que toutes les requêtes soient terminées
            const fetchProduitDetails = async () => {
              const produitDetailsArray = await Promise.all(
                id_produits.map((id_produit) =>
                  axios.get(`http://149.56.13.47:5000/produit/find/${id_produit}`)
                )
              );

              // produitDetailsArray contient les résultats de toutes les requêtes
              setProduit_detail(produitDetailsArray);
            };

            fetchProduitDetails();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    // Recalculate the total based on the updated quantities
    let newTotalPrice = 0;
    quantites.forEach((quantity, i) => {
      const produitDetail = produit_detail[i]?.data?.client; // Accédez aux détails du produit
      if (produitDetail) {
        newTotalPrice += produitDetail.prix_produit * quantity;
      }
    });
    setTotal(newTotalPrice);
  }, [quantites, produit_detail]);

  return (
    <>
      <div className="panier">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du produit</th>
              <th>Prix du produit</th>
              <th>Image du produit</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {produit_detail.map((item, index) => (
              <tr key={item.data.client.idproduit}>
                <td>{item.data.client.nom_produit}</td>
                <td>{item.data.client.prix_produit}</td>
                <td>
                  <img
                    src={`http://149.56.13.47:5000/images/${item.data.client.image}`}
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
              <td>{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>

        <div className="button-container">
          <button className="btn btn-danger" onClick={handleViderPanier}>
            <h6>Vider le panier</h6>
          </button>

          <button className="btn btn-success" onClick={handleConfirmerPanier}>
            <h6>Confirmer le panier et passer au paiement</h6>
          </button>
        </div>
      </div>

      <Modal show={showPanierModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir vider le panier ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleModalConfirm}>
            Vider le panier
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaiementModal} onHide={handleModalClose}>
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
