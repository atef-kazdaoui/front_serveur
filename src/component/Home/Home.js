import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel/Carousel';
import Filtreimage from './Filtre/Filtreimage';
import './Home.css';
import Footer from '../footer/Footer';


function Home() {

  return (
    <>
      <div className='body'>
        <Carousel />
        
        
        <div className='produit'>
          <h1>nos produits</h1>
          <Filtreimage/>
        </div>
        
        
      </div>
      <Footer/>
    </>
    
  );
}


export default Home;
