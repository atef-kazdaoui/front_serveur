import React from 'react';
import Footer from '../footer/Footer';
import image1 from './aaa1.png';
import image2 from './aaa2.png';
import image3 from './aa3.png';



function PRATICIEN () {
  return (
    <>
    <div className="marque-container">
      <div className="div1">
        <img src={image1} alt="Description de l'image" />;

      </div>
      <div className="div2">
      <img src={image2} alt="Description de l'image" />;

        
      </div>
      <div className="div3">
        <img src={image3} alt="Description de l'image" />;

      </div>
    </div>
    <Footer />
    </>
  );
}

export default PRATICIEN;
;
