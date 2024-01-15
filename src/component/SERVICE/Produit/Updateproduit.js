import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [nom_produit, setNom_produit] = useState('');
  const [description_produit, setDescription_produit] = useState('');
  const [prix_produit, setPrix_produit] = useState('');
  const [nombre_produit, setNombre_produit] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('nom_produit', nom_produit);
    formData.append('description_produit', description_produit);
    formData.append('prix_produit', prix_produit);
    formData.append('nombre_produit', nombre_produit);

    try {
      
      await axios.patch(`http://localhost:5000/produit/update/${id}`, formData);
      setMessage('Les modifications ont été enregistrées avec succès');
      console.log("cest bon" );
      setError(null);
      navigate('/produit');
    } catch (error) {
      console.log(error.response.data);
      setError('Une erreur est survenue lors de la mise à jour des données');
      console.log('Une erreur est survenue lors de la mise à jour des données');
      setMessage(null);
    }
  };

  return (
    <>
      <div className="update">
        <h1>Modification</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-update">
        <div className="container">
          <div className="form-group">
            <label htmlFor="nom">Nom produit :</label>
            <input
              type="text"
              placeholder="Nom produit"
              className="form-control"
              id="nom"
              value={nom_produit}
              onChange={(event) => setNom_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description du produit :</label>
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              id="description"
              value={description_produit}
              onChange={(event) => setDescription_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prix">Prix produit :</label>
            <input
              type="text"
              placeholder="Prix produit"
              className="form-control"
              id="prix"
              value={prix_produit}
              onChange={(event) => setPrix_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre produit :</label>
            <input
              type="text"
              placeholder="Nombre produit"
              className="form-control"
              id="nombre"
              value={nombre_produit}
              onChange={(event) => setNombre_produit(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image">Insérer l'image du produit :</label>
            <input
              className="form-control"
              type="file"
              name="image"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Modifier
          </button>
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default Update;
