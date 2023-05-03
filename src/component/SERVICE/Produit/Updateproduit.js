import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Update = () => {
  const { id } = useParams(); 
  const [nom_produit, setNom_produit] = useState('');
  const [description_produit, setDescription_produit] = useState('');
  const [prix_produit, setPrix_produit] = useState('');
  const [nombre_produit, setNombre_produit] = useState('');
  const [error, setError] = useState(null);
  const [message, setmessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(nom_produit, description_produit, prix_produit, nombre_produit);
    
    let data = {
        nom_produit: nom_produit,
        description_produit: description_produit,
        prix_produit: prix_produit,
        nombre_produit: nombre_produit,
    }
    axios.patch(`http://localhost:5000/produit/update/${id}`, data)
      .then((response) => {
        console.log(response.data);
        setmessage('Les modifications ont été enregistrées avec succès');
        setError(null);
        navigate('/produit');
      })
      .catch((error) => {
        console.log(error.response.data);
        setError('Une erreur est survenue lors de la mise à jour des données');
        setmessage(null);
      });
  };
  return (
    <>
      <div className='update'>
        <h1>modification</h1>

      </div>
      <form onSubmit={handleSubmit} className="form-update">
     
        <div className='container'>
          <div className="form-group">
            <label htmlFor="nom">Nom produit :</label>
            <input
              type="string"
              placeholder=' nom produit '
              className="form-control"
              id="nom"
              value={nom_produit}
              onChange={(event) => setNom_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">description duproduit</label>
            <input
              type="string"
              placeholder='description '
              className="form-control"
              id="prenom"
              value={description_produit}
              onChange={(event) => setDescription_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse_domicile">Prix produit :</label>
            <input
              type="string"
              placeholder='Prix produit '
              className="form-control"
              id="adresse"
              value={prix_produit}
              onChange={(event) => setPrix_produit(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Nombre produit:</label>
            <input
              type="email"
              placeholder='nom produit'
              className="form-control"
              id="email"
              value={nombre_produit}
              onChange={(event) => setNombre_produit(event.target.value)}
            />
          </div>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary">
            modifier
          </button>
          
          {message ? <div className="alert alert-success">{message}</div> : error && <div className="alert alert-danger">{error}</div>}
        </div>
      </form>
    </>
  );
};

export default Update;

