import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import { Routes, Route} from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Inscription from './component/Inscription/Inscription';
import Connexion from './component/Connexion/Connexion';
import Apropos from './component/Apropos/Apropos';
import Client from './component/SERVICE/Affclient';
import Updateclient from './component/SERVICE/Updateclient';
import Produit from './component/SERVICE/Affproduit';
import Ajoutproduit from './component/SERVICE/Ajoutproduit'
import Updateproduit from './component/SERVICE/Updateproduit'
import Profil from './component/SERVICE/Profil'
import './App.css'
import axios from 'axios';
function App() {
     
  
  axios.interceptors.request.use(
    config => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(config.headers.Authorization)      
      }
      return config;
    },
    error => Promise.reject(error)
  );
        return (
        
            
        <div className="App" >
          <Navbar />

            <Routes>
                     <Route exact path="/" element={<Home/>}/>
                     <Route exact path="/inscription" element={<Inscription/>}/>
                     <Route exact path="/connexion" element={<Connexion/>}/>
                     <Route exact path="/Apropos" element={<Apropos/>}/>
                     <Route exact path="/client" element={<Client/>}/>
                     <Route exact path="/produit" element={<Produit/>}/>
                     <Route exact path="/ajoutproduit" element={<Ajoutproduit/>}/>
                     <Route exact path="/updateclient/:id" element={<Updateclient/>}/>
                     <Route exact path="/updateproduit/:id" element={<Updateproduit/>}/>
                     <Route exact path="/updateclient" element={<Updateclient/>}/>
                     <Route exact path="/profil/:id" element={<Profil/>}/>
                     
                </Routes>
        </div>
    );
}
export default App;
