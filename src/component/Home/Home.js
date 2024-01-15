import React from 'react';
import Carousel from '../Carousel/Carousel';
import Filtreimage from './Filtre/Filtreimage';
import './Home.css';
import Footer from '../footer/Footer';


function Home() {

  return (
    <>
      <div className='body'>
        <Carousel/>
        
        
        <div className='produit'>
         
          <Filtreimage/>
        </div>
        
        
      </div>
      <Footer/>
    </>
    
  );
}


export default Home;
