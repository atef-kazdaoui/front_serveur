import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import logo from "./logo192.png"

function Navbare(props) {
  const [role, setRole] = useState(null);
  const [nom, setNom] = useState(null);
  const [id, setId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
      const nom = decodedToken.nom;
      const id = decodedToken.id
      setId(id);
      setRole(role);
      setNom(nom);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  function handleDeconnexion() {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload();
    navigate('/home')
  }

  return (
    <Navbar expand="lg" className='navbar' style={{ backgroundColor: "#D4DAF0" }} >
      <Container fluid>
        <Navbar.Brand>
          <img
            src={logo}
            width="70"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
          {' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            id='Navbar'
          >
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            {role === 'responsable' && <Nav.Link as={Link} to="/produit">Nos produit</Nav.Link>}
            {role === 'responsable' && <Nav.Link as={Link} to="/client">Nos Client</Nav.Link>}
            {role === 'responsable' && <Nav.Link as={Link} to="/ajoutproduit">Ajout des produits</Nav.Link>}
            {isAuthenticated && role === 'utilisateur' && <Nav.Link as={Link} to={`/profil/${id}`}>Mon profil</Nav.Link>}

            {isAuthenticated ? (
              <Nav.Link onClick={handleDeconnexion}>Déconnexion</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/connexion">Connexion</Nav.Link>
            )}
            <Nav.Link as={Link} to="/Apropos">A propos de nous</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbare;
