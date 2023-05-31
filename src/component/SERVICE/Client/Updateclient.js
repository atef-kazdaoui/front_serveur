import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse_domicile, setadresse_domcile] = useState('');
  const [adresse_email, setadresse_email] = useState('');
  const [numero_telephone, setnumero_telephone] = useState('');
  const [password, setpassword] = useState('');
  const [re_password, setCpassword] = useState('');
  const [image, setImage] = useState('');  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('adresse_domicile', adresse_domicile);
    formData.append('adresse_email', adresse_email);
    formData.append('numero_telephone', numero_telephone);
    formData.append('password', password);

    try {
      await axios.patch(`http://localhost:5000/users/update/${id}`, formData);
      setMessage('Les modifications ont été enregistrées avec succès');
      setError(null);
      navigate('/client');
    } catch (error) {
      console.log(error.response.data);
      setError('Une erreur est survenue lors de la mise à jour des données');
      setMessage(null);
    }
  };

  return (
    <>
      <div className="update">
        <h1>Modification</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-update">
      <div className='container'>
          <div className="form-group">
            <label htmlFor="nom">Nom :</label>
            <input
              type="string"
              placeholder='Votre nom '
              className="form-control"
              id="nom"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prenom :</label>
            <input
              type="string"
              placeholder='Votre prenom '
              className="form-control"
              id="prenom"
              value={prenom}
              onChange={(event) => setPrenom(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse_domicile">Adresse domicile :</label>
            <input
              type="string"
              placeholder='Votre adresse domicile '
              className="form-control"
              id="adresse"
              value={adresse_domicile}
              onChange={(event) => setadresse_domcile(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse e-mail :</label>
            <input
              type="email"
              placeholder='Votre adresse email'
              className="form-control"
              id="email"
              value={adresse_email}
              onChange={(event) => setadresse_email(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="string">numero telephone :</label>
            <input
              type="string"
              placeholder='Votre numero de telephone'
              className="form-control"
              id="numero_telephone"
              value={numero_telephone}
              onChange={(event) => setnumero_telephone(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              placeholder='Choisissez une mot de passe'
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setpassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirmation du mot de passe:</label>
            <input
              type="password"
              placeholder='Re-taper votre mot de passe'
              className="form-control"
              id="Cpassword"
              value={re_password}
              onChange={(event) => setCpassword(event.target.value)}
            />
          </div>
          <div className="form-group">
    <label htmlFor="image">Image :</label>
    <input
      type="file"
      className="form-control"
      id="image"
      accept="image/*"
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
