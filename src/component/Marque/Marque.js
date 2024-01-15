import React from 'react';
import image1 from './aaa.png';
import image2 from './aaa1.png';
import image3 from './aaa2.png';
import image4 from './aaa3.png';
import image5 from './aaa4.png';
import image6 from './aaa5.png';
import './Marque.css';
import Footer from '../footer/Footer';

function Marque () {
  return (
    <>
    <div className="marque-container">
      <div className="div1">
        <img src={image1} alt="Description de l'image" />
      </div>
      <div className="div2">
        <img src={image2} alt="Description de l'image" />
      </div>
      <div className="div3">
        <img src={image3} alt="Description de l'image" />
      </div>
      <div className="div4">
        <img src={image4} alt="Description de l'image" />
      </div>
      <div className="div5">
        <img src={image5} alt="Description de l'image" />
      </div>
      <div className="div6">
        <img src={image6} alt="Description de l'image" />
      </div>;
      

    </div>
    <Footer />
    </>
  );
}

export default Marque;
