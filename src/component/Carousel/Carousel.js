import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import '../Carousel/Carousel.css';


function CarouselFadeExample() {
  return (
    
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
          id='image1'
        />
        <Carousel.Caption>
          <h3>Produit 1</h3>
          <p>description</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
          id='image2'
        />

        <Carousel.Caption>
          <h3>Image2</h3>
          <p>description</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
          id='image3'
        />

        <Carousel.Caption>
          <h3>image3</h3>
          <p>
            description
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
}

export default CarouselFadeExample;