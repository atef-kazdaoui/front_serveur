import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Connexion.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner'

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [message, setmessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // add isLoading state
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    let data = {
      adresse_email: email,
      password: password,
    }
    // Ici, vous pouvez envoyer les données du formulaire à votre API
    setIsLoading(true); // start the spinner
    axios
      .post(`http://localhost:5000/users/login`, data)
      .then((res) => {
        console.log(res.data);
        setmessage(res.data.message);
        sessionStorage.setItem('token', res.data.token);
        navigate('/home')
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
        setIsLoading(false); // stop the spinner
      });


  }
  return (
    <>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      <div className='titre-connexion'>
      <h1 style={{color:'black'}}>Connexion</h1>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit} className="form-connexion">
          <div className="form-group">
            <label htmlFor="email" style={{color:'black'}}>Adresse e-mail :</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAghJREFUaEPtmo1NxDAMhX2bwCYwCTAJMAkwybEJbAJ6UoJC6/wpduq2jnS6k9qmfv7i11zSC52sXU6ml1zw0Yk7YSd8sAz4kD4Y0JUcJ7xIyR0RPRARvm+M0/8mInyewjcbbonwIxG9GReZC++ViF64gznBoPm1U7Ex7FuOdE7wNQzjPWv+JKL7pYCc4J89K01iX+nrEQxDsG5cVaA9glETMDE4tqWGoQtn5jxniHC8GO6HR5UF2hD6HrLPlaGIYPQPsVvSjlRRZrGpCo432YJ2SjUtrSmCZ9LmqKoKZh/kyR01aeeoqgqO81RkOteka7tGFXHgqQE/4Ux0yLSiSMxT4YypYSwTIEG7hSqEYs6fayKC0bkm7VGqqXgxwVq0JaiqCpaiLUlVXfAobWmq0wT30sb5xdWJigMXvOrvkHgN527a4uS1gGsOXLsex6cJbqXNBV16rraInDqkuYB6aEtQ3VxwC21JqiYEl5xcmqopwSlt/M7NgXtrVX1qKRWQdj9TXVpbTEv/Lrhn1bIlo9bOccJOOIxJ32qxVpyN8XgNew2HoYKNKQt7R40jlz0NC41YS//XfEM8pEPr79oIsd5rsfu/2jQovdQisZjeG6TU+dmFwdp7WiD9HOp5DzWNHZEPjmzMZE2wVMbN9OOCzaBQCsQJKyXWTLdO2AwKpUCcsFJizXR7OsK/7BGBPW3SaxEAAAAASUVORK5CYII=" />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{color:'black'}}>Mot de passe :</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAAXNSR0IArs4c6QAAArZJREFUeF7tnAEyBDEQRdtJcBKcBCfBSXASnAQnoT4ZtcZOJr+T7rFVf6oUS08y/+1PJ9M7cWQ6mgkcNUcq0ASLMIFgCRZBgAiVsw4Q1omZXZXrPjYzvH4rr1/Kz8+ErpDQLZ01AboscNYEAt6jmd2uBUb9fStYEHzjFLUZtGxYcNO9mZ07Qe2eBmgXO8N1QJP1JjJhAdDTYEUAdm1mKfksCxYc9ToY1NRcmsOyYMFRLUMPwqcvAG45B9BwzmnQm/HTbAasFlB3lVlumjXXJoSHMiTDmEXDWstTTM4BNIDH96UDCT8sf0XDqrkKoiCOOdZmU0+bzf1Hw/qoXAlyzLRKb77g4qzaZBHmrkhYuH3Bmmrf0Suo1nYt/zFvyp/YSFhLQ3DUzLXUfthQjISFobIvGY+ateDa6eZ7vrIPWUZEwlrKV1hxA1jvUbu/DNEV0mihsATLm9jncGvLklF9/OozClbt9maUkIw+BMs7/uUsgpxgCdZXBcJzd1BFJ2fJWXLW3ANaOhCj4iBhTZXMsx2h+N1SkW5Uca61DyT691IU7Oq7J8GvFeIIk6SFAhbuTV0zZQ+spapCmnJnR+4SkRdWy4cQTi0pp7nKRF5YtXJxitoBndALVw+sWkl3gIa0JujStgdWz0MdaSQaOqJr9YLVQHUKESzBaiKgYdiE6TtIsASLIECEylmCRRAgQuUswSIIEKFylmARBIhQOUuwCAJEqJwlWAQBIlTOEiyCABEqZwkWQYAIlbMEiyBAhMpZgkUQIELlrP8Ga23DJXG9m4bS22I8H7JGbg7PpJfyYAgELe3IyhTb01fqI0ct+5V7xESem/4wG8S07oqPFM623bVx05Oz5heIhA9weAC3tjOeFTYyHv8pCaA2ewB3pJiDaGuEsw5C6IiLFCyComAJFkGACJWzCFifeNCyTOTZiUMAAAAASUVORK5CYII=" />
          </div>
          <button type="submit" className="btn btn-dark">
            Connexion
          </button>



          <div className='inscription-connexion'>
            <p></p>
            <NavLink as={Link} to="/Inscription "> <h3>S'inscrire</h3></NavLink>
            {message ? (
              <div className="alert alert-success">{message}</div>
            ) : (
              error && <div className="alert alert-danger">{error.msg}</div>
            )}
          </div>
          <div className="reset-password">
            <p />
            <NavLink as={Link} to='/reset-password'> <h3>Mot de passe oublier ?</h3></NavLink>
            {message
              ? <div className="alert alert-success">{message}</div>
              : error && <div className="alert alert-danger">{error.msg}</div>}
          </div>


          {
            isLoading && ( // display the spinner if isLoading is true
              <div className="spinner-container">
                {isLoading && (
                  <InfinitySpin
                    height='200'
                    width='200'
                    color="#4fa94d"
                    id='infinitySpin'
                  />
                )}
              </div>
            )
          }
        </form >
      </div>
    </>
  );
};

export default SigninForm;
