import React, { useState } from 'react';
import './LoginPage.css';
import sanlamLogo from './SanlamLogo.png'; // Utilisez require pour importer l'image
import axios from '../../axiosConfig';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }; 

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7214/api/Admins/login', { email, password }); // Remplacez '/api/login' par l'URL de votre endpoint d'authentification

      if (response.data.success) {
        // Authentification réussie, redirigez l'administrateur vers son espace
        window.location.href = '/adminDashBooard'; // Remplacez '/admin-space' par l'URL de l'espace administrateur
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (error) {
      console.error(error);
      setError('Une erreur s\'est produite lors de la connexion.');
    }
  };

  return (
    <div className="admin-login-container">
      <img src={sanlamLogo} alt="Sanlam Logo" className="sanlam-logo" />
      <h2 className="auth-title">Authentification</h2>

      <form className="admin-login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Connexion
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
