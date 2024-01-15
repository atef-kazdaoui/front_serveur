// Footer.js
import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <div className="contenu-footer">
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
