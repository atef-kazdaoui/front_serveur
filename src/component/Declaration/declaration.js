import React, { useState } from 'react';
import './declaration.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Declaration() {
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const [affich, setAffich] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      message: message
    };
    axios
      .post(`http://localhost:5000/declaration/ajouter/${id}`, data)
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        setAffich('Ajout de la déclaration avec succès');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
        setAffich('Erreur lors de l\'ajout de la déclaration');
      });
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    setAffich('');
  };

  return (
    <div className="container">
      <h2>Formulaire de déclaration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="messageTextarea">Message</label>
          <textarea
            className="form-control"
            id="messageTextarea"
            rows="5"
            value={message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary button">Envoyer</button>
      </form>
      {affich && <p className="message">{affich}</p>}
    </div>
  );
}

export default Declaration;
