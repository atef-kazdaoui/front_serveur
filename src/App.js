import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Inscription from './component/Inscription/Inscription';
import Connexion from './component/Connexion/Connexion';
import Apropos from './component/Apropos/Apropos';
import Client from './component/SERVICE/Client/Affclient';
import Updateclient from './component/SERVICE/Client/Updateclient';
import Produit from './component/SERVICE/Produit/Affproduit';
import Ajoutproduit from './component/SERVICE/Produit/Ajoutproduit'
import Updateproduit from './component/SERVICE/Produit/Updateproduit'
import Profil from './component/SERVICE/Client/Profil'
import Home1 from './component/accueil/Acceuil'
import Panier from './component/panier/Panier'
import Declaration from './component/Declaration/declaration'
import RDV from './component/rendez-vous/RDV'
import './App.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';



function App() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 5000)


  }, [])

  {/**ici pour envoyer le token dans headers.authorization bearer aprés token pour que le miidlweau auth fonctionne bien  */ }
  axios.interceptors.request.use(
    config => {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        setRole(decodedToken.role)
        config.headers.Authorization = `Bearer ${token}`;
        console.log(config.headers.Authorization)
      }
      return config;
    },
    error => Promise.reject(error)
  );
  return (


    <div className="App" >

      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home1 />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/inscription" element={<Inscription />} />
        <Route exact path="/connexion" element={<Connexion />} />
        <Route exact path="/Apropos" element={<Apropos />} />
        {role === 'responsable' && <Route exact path="/client" element={<Client />} />} {/**ici j'ai fais ça pour securiser au niveau front et aussi au niveau back ces pages qui sont considérer pour l'admin seulement  */}
        {role === 'responsable' && <Route exact path="/produit" element={<Produit />} />}
        {role === 'responsable' && <Route exact path="/ajoutproduit" element={<Ajoutproduit />} />}
        {role === 'resposable' && <Route exact path="/updateclient/:id" element={<Updateclient />} />}
        {role === 'responsable' && <Route exact path="/updateproduit/:id" element={<Updateproduit />} />}
        {role === 'responsable' && <Route exact path="/updateclient" element={<Updateclient />} />}
        <Route exact path="/profil/:id" element={<Profil />} />
        <Route exact path="/panier/:id" element={<Panier />} />
        <Route exact path="/declaration/:id" element={<Declaration/>}/>
        <Route exact path="/rendez-vous/:id" element={<RDV/>}/>
      </Routes>

    </div>
  );
}
export default App;
