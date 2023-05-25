import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <div className="contenu-footer">
       
        <div className="bloc footer-service">
          <h3 className='h3'>Restons en contact</h3>
          <p>55-55-55-55-55</p>
          <p>atef.kasdaoui1@gmail.com</p>
          <p>6 rue de l'invention, Paris VII, 75007</p>
        </div>
        <div className="bloc footer-service">
          <h3 className='h3'>Nos horraires</h3>
          <ul className="liste-horraires">
            <li>✅ Lun 10h-19h</li>
            <li>✅ Mar 10h-19h</li>
            <li>✅ Mer 10h-19h</li>
            <li>✅ Jeu 10h-19h</li>
            <li>✅ Ven 10h-19h</li>
            <li>❌ Sam 10h-19h</li>
            <li>❌Dim 10h-19h</li>
          </ul>
        </div>
        <div className="bloc footer-service">
          <h3 className='h3'>Nos reseaux</h3>
          <ul className="liste-media">
            <li>
              <a href="#"><FaFacebook /> facebook</a>
            </li>
            <li>
              <a href="#"><FaInstagram /> instagram</a>
            </li>
            <li>
              <a href="#"><FaTwitter /> twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
