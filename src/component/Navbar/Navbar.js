import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Navbar/navbar.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
function Navbare(props) {
  const [role, setRole] = useState(null);
  const [nom, setNom] = useState(null);
  const[id,Setid] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
      const nom = decodedToken.nom;
      const id=decodedToken.id
      Setid(id);
      setRole(role);
      setNom(nom);
      console.log(role)
      console.log(id)
    } else {
      console.log('Personne n\'est connecté');
    }
  }, []); 
  function handleDeconnexion() {
    sessionStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <Navbar  expand="lg" className='navbar-dark bg-dark'>
      <Container fluid>
        <Navbar.Brand href="#">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            id='Navbar'
          >
            <Nav.Link as={Link} to="/"  >Home</Nav.Link>
            {role ==='responsable'  && <Nav.Link as={Link} to="/produit">Nos produit</Nav.Link>}
            {role ==='responsable'  && <Nav.Link as={Link} to="/client">Nos Client</Nav.Link>} 
            {role ==='responsable'  && <Nav.Link as={Link} to="/ajoutproduit">Ajout des produits</Nav.Link>}
            {role === 'utilisateur' && <Nav.Link as={Link} to={`/profil/${id}`}>Mon profil</Nav.Link>}

            <Nav.Link as={Link} to="/Apropos">A propos de nous</Nav.Link>
            {sessionStorage.getItem('token') ? (
              <Nav.Link onClick={handleDeconnexion}>Déconnexion</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/connexion">Connexion </Nav.Link>
            )}
          </Nav>
          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbare;