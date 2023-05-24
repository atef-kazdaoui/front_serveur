import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './panier.css';
function Panier() {
    const [panier, setPanier] = useState([]);
    const [produits, setProduits] = useState([]);
    const [total, setTotal] = useState(0);

    const { id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:5000/panier/findP/${id}`)
            .then(response => {
                setPanier(response.data);

                const produitsArray = []; // Tableau pour stocker les produits
                let totalPrice = 0;
                response.data.forEach(item => {
                    const idProduit = item.id_produit;
                    console.log(item.quantite)

                    axios.get(`http://localhost:5000/produit/find/${idProduit}`)
                        .then(response => {
                            console.log('obj', response.data.client);
                            response.data.client['quantite'] = item.quantite;//ici on a ajouter quantité dans l'objet 
                            produitsArray.push(response.data.client); // Ajouter le produit  au tableau
                            totalPrice += response.data.client.prix_produit * item.quantite;
                            setTotal(totalPrice);
                            setProduits(produitsArray); // Mettre à jour l'état produits
                        });
                });
                console.log("le tableau", produitsArray);
                console.log('voici le total',total)

            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleConfirmerPanier = () => {
        alert('confirmer panier');
      };





    return (
        <>
            <div className='panier'>
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
                        {produits.map(produit => (
                            <tr key={produit.idproduit}>
                                <td>{produit.nom_produit}</td>
                                <td>{produit.prix_produit}</td>
                                <td>
                                    <img src={"http://localhost:5000/images/" + produit.image} alt="produit" width="80" height="100" />
                                </td>
                                <td>{produit.quantite}</td>
                            </tr>
                        ))}
                        <tr>
            <td colSpan="3">Total</td>
            <td>{total}</td>
          </tr>
                    </tbody>
                </Table>
                <Button onClick={handleConfirmerPanier} variant="primary">Confirmer le panier et passer au paiement</Button>
            </div>
        </>
    );

}

export default Panier;



