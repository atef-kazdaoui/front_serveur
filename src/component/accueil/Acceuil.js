import React, { useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import Typical from 'react-typical';
import './Acceuil.css';
import { useNavigate } from 'react-router-dom';

function Verif() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Rediriger vers la nouvelle page d'accueil ici
      console.log("Redirection vers la nouvelle page d'accueil...");
      navigate('/home');
    }, 6000);

    // Nettoyer le timer lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container-acceuil">
      <InfinitySpin color='DodgerBlue'  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }} />

      <Typical 
  steps={['bienvenue chez salle esthetique veuillez patintez ', 5000]}
  wrapper="h2"
 
  
/>
  

    </div>
  );
}

export default Verif;
