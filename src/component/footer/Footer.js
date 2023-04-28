import './Footer.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
   
   
   return (
     
      <div class="footer bg-dark">
         <div class="container-fluid">
            <div class="row">
               <h2 >a propos</h2>
               <div class="col-md-6 ">
                  <div className="d-flex">
                     <p className='lien'>rejoigner nous sur facebook</p>
                     <a href="facebook.com"><FaFacebook className="icone" /></a>
                  </div>
               </div>
               <div class="col-md-6">
                  <div className="d-flex">
                     <p className='lien'>rejoigner nous sur instagram</p>
                     <a href="instagram.com"><FaInstagram className="icone" /></a>
                  </div>
               </div>
            </div>
         </div>
      </div>

   );
}

export default Footer;
