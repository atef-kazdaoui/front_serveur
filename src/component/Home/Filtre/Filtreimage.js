import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './Flitre.css'

function ProductList() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/produit/find')
      .then(response => {
        setProduits(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      
      <Row className='atef' >
      {produits.produit && produits.produit.map(produit => (
          <Col   key={produit.idproduit}>
            <Card>
              <Card.Img variant="top" src={"http://localhost:5000/images/"+produit.image} />
              <Card.Body>
                <Card.Title>{produit.nom_produit}</Card.Title>
                <Card.Text>{produit.description_produit}</Card.Text>
                <Card.Text>Price: ${produit.prix_produit}</Card.Text>
                <Button variant="primary">Add to cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
    </Container>
  );
}

export default ProductList;
