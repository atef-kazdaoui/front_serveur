import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Ajoutproduit = () => {
  const [nom_produit, setNom_produit] = useState('');
  const [description_produit, setDescription_produit] = useState('');
  const [prix_produit, setPrix_produit] = useState('');
  const [nombre_produit, setNombre_produit] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const [message, setmessage] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image); // Ajouter l'image à formData
    formData.append('nom_produit', nom_produit);
    formData.append('description_produit', description_produit);
    formData.append('prix_produit', prix_produit);
    formData.append('nombre_produit', nombre_produit);

    axios.post(`http://localhost:5000/produit/ajouter`, formData).then(res => {
      console.log(res.data);
      setmessage(res.data.message);
      console.log(message)
      navigate('/home');
    
    })
      .catch(error => {
        console.log(error);
        setError(error.response.data); // mise à jour de l'état avec le message d'erreur
      });
  }
  return (
    <>
      <div className='ajout_produit'>
        <h1>Ajouter un produit</h1>

      </div>
      <form onSubmit={handleSubmit} className="form-ajout">

        <div className='container'>
          <div className="form-group">
            <label htmlFor="nom">Nom du produit :</label>
            <input
              type="string"
              placeholder=' Nom du produit '
              className="form-control"
              id="nom"
              value={nom_produit}
              onChange={(event) => setNom_produit(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1" class="form-label" htmlFor="prenom">Description du produit:</label>
            <textarea
              type="string"
              placeholder='Dscription duproduit '
              className="form-control"
              id="prenom"
              value={description_produit}
              onChange={(event) => setDescription_produit(event.target.value)}
            />

          </div>
          <div className="form-group">
            <label htmlFor="adresse_domicile">Prix du produit</label>
            <input
              type="string"
              placeholder='prix produit '
              className="form-control"
              id="adresse"
              value={prix_produit}
              onChange={(event) => setPrix_produit(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">nombre du produit</label>
            <input
              type="email"
              placeholder='nombre du produit'
              className="form-control"
              id="email"
              value={nombre_produit}
              onChange={(event) => setNombre_produit(event.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="formFile" class="form-label">Inserer l'image du produit</label>
            <input class="form-control" type="file" name='image' onChange={(event) => setImage(event.target.files[0])} />

          </div>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary">
            Ajout du produit
          </button>
          {typeof message === 'string' ? <div className="alert alert-success">{message}</div> : null}
          {error && <div className="alert alert-danger">{error}</div>}


        </div>
      </form>
    </>
  );
};

export default Ajoutproduit;

