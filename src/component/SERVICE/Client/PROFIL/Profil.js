import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profil.css';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const [client, setClient] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://149.56.13.47:5000/users/find/${id}`)
      .then((response) => {
        if (!client) {
          setClient(response.data.client);
        }
        console.log(response.data);
        console.log('client', client);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, client]);

  if (!client) {
    return null;
  }

  const handleupdate = (id) => {
    navigate(`/updateclient/${id}`);
  };

  return (
    <Container fluid className="profil">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="transparent-card"> {/* Ajout de la classe CSS pour la transparence */}
            <Card.Header>
              <Card.Title>Profil du client</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Img
                    src={`http://149.56.13.47:5000/images/${client.image}`}
                    alt="profil"
                    className="img-fluid rounded-circle profile-image"
                  />
                </Col>
                <Col>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Nom:</strong> {client.nom}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Prénom:</strong> {client.prenom}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Adresse e-mail:</strong> {client.adresse_email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Numéro de téléphone:</strong>{' '}
                      {client.numero_telephone}
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="text-center mt-4">
                    <Button
                      
                      variant="dark"
                      onClick={() => handleupdate(client.iduser)}
                    >
                      Modifier mon profil
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profil;
