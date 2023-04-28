import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Connexion.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [message, setmessage] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(email, password);
    let data = {
      adresse_email: email,
      password: password,

    }
    // Ici, vous pouvez envoyer les données du formulaire à votre API
    
    axios.post(`http://localhost:5000/users/login`, data)
      .then(res => {  
        console.log(res.data);
        alert(res.data.message)
        sessionStorage.setItem('token', res.data.token); // stockage de session
        navigate('/ ');
        window.location.reload();
      }
      ).catch(error => {
        console.log(error.response.data);
        setError(error.response.data)

      });
      
  };
  
  return (
    <>
      <div className='connexion'>
        <h1>Connexion</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-connexion">

        <div class='container'>
          <div className="form-group">
            <label htmlFor="email">Adresse e-mail :</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Connexion
          </button>
        </div>
        <div className='connexion'>
          <p></p>
          <NavLink as={Link} to="/Inscription "> <h3>S'inscrire</h3></NavLink>
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : (
            error && <div className="alert alert-danger">{error.msg}</div>
          )}
        </div>
      </form>
    </>
    );
};
export default SigninForm;


