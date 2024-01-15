import React from 'react';
import image1 from './1.png';
import image2 from './2.png';
import image3 from './3.png';
import image4 from './4.png';
import './LEMAG.css';
import Footer from '../footer/Footer';

function Marque() {
  return (
    <>
      <div className="marque-container">
        <div className="div1">
          <img src={image1} alt="Description de l'image" />
        </div>
        <div className="div2">
          <img src={image2} alt="Description de l'image" />;
        </div>
        <div className="div3">
          <img src={image3} alt="Description de l'image" />;
        </div>
        <div className="div4">
          <img src={image4} alt="Description de l'image" />;
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Marque;
