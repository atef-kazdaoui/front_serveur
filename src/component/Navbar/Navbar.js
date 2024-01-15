import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import logo from "./logo192.png"
import './navbar.css'

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

  function handleDeconnexion () {
  sessionStorage.removeItem ('token');
  setIsAuthenticated (false);
  navigate ('/home');
  window.location.reload ();
}


  return (
   <Navbar expand="lg" className='navbar  custom-navbar'>
      <Container fluid>
        <Navbar.Brand>
          <img
            src={logo}
            width="500"
            height="300"
            className="d-inline-block align-top"
            alt="Logo"
          />
          {' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id = 'navbarScroll'>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '70px' }}
            navbarScroll
            id='Navbar'
          >
            <Nav.Link as={Link} to="/home">LA GAMME</Nav.Link>
            <Nav.Link as={Link} to="/MARQUE">LA MARQUE</Nav.Link>
            <Nav.Link as={Link} to="/PRATICIEN">PRATICIEN</Nav.Link>
            <Nav.Link as={Link} to="/LEMAG">LE MAG</Nav.Link>




            {role === 'responsable' && <Nav.Link as={Link} to="/produit">NOS PRODUITS</Nav.Link>}
            {role === 'responsable' && <Nav.Link as={Link} to="/client">NOS CLIENTS</Nav.Link>}
            {role === 'responsable' && <Nav.Link as={Link} to="/ajoutproduit">AJOUTER DES PRODUITS</Nav.Link>}


            
             {isAuthenticated && role === 'utilisateur' &&<Nav.Link as={Link} to={`/rendez-vous/${id}`}>PRENDRE UN RENDEZ-VOUS</Nav.Link>}
             {isAuthenticated && role === 'utilisateur' && <Nav.Link  as={Link} to={`/mes_rdv/${id}`}> MES RDV </Nav.Link>  }
            
            {isAuthenticated && role === 'utilisateur' &&<Nav.Link as={Link} to={`/declaration/${id}`}>RECLAMATION</Nav.Link>}
            {isAuthenticated ? (
              <Nav.Link onClick={handleDeconnexion}>DECONNEXION</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/connexion">CONNEXION</Nav.Link>
            )}
             <Nav className="ms-auto">
           
            {isAuthenticated && role === 'utilisateur' && <Nav.Link as={Link} to={`/profil/${id}`} >
              <i className='bx bxs-user bx-lg bx-user-large user'></i>
            </Nav.Link>}
            {isAuthenticated && role === 'utilisateur' && <Nav.Link className='panier1' as={Link} to={`/panier/${id}`}> <i class='bx bxs-cart panier-ajout'></i> </Nav.Link>  }
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbare;
