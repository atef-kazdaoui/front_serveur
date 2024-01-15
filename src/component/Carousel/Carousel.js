import React from 'react';
import '../Carousel/Carousel.css'; // Assurez-vous que le CSS de Bootstrap est bien importé
import video from './app.mp4';

function CarouselVideoExample() {
  return (
    <div className='video-container'>
      <video className="w-100" src={video} autoPlay loop muted></video>
    </div>
  );
}

export default CarouselVideoExample;
