import React, { useState } from 'react';
import './LoginPage.css';
import sanlamLogo from './SanlamLogo.png'; 
import { Link } from 'react-router-dom';



const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false); 
  const [firstName, setFirstName] = useState(''); // Initialisez avec une valeur vide par défaut
  const [lastName, setLastName] = useState('');
 

  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('handleLogin function is called');
  
    try {
      const response = await fetch(`https://localhost:7214/api/Admins/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
  
        if (data.id) {
          // Maintenant que vous avez l'ID de l'administrateur authentifié, effectuez une nouvelle requête pour obtenir les informations du nom et du prénom
          const adminInfoResponse = await fetch(`https://localhost:7214/api/Admins/${data.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (adminInfoResponse.ok) {
            const adminInfoData = await adminInfoResponse.json();
  
            // Vous avez maintenant les informations du nom et du prénom de l'administrateur authentifié
            const { firstName, lastName } = adminInfoData;
            console.log(`First Name: ${firstName}`);
            console.log(`Last Name: ${lastName}`);
  
            // Utilisez ces informations pour naviguer vers AdminDashboard en utilisant Link
            setAuthenticated(true);
            
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Connexion réussie', {
                body: `Vous êtes connecté en tant que ${email}`,
              });
            }
          } else {
            console.log(`Login failed for email: ${email}`);
            setError('Identifiants incorrects. Veuillez réessayer.');
            setAuthenticated(false);
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Échec de la connexion', {
                body: 'Identifiants incorrects. Veuillez réessayer.',
              });
            }
          }
        } else {
          console.log(`Login failed for email: ${email}`);
          setError('Identifiants incorrects. Veuillez réessayer.');
          setAuthenticated(false);
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Échec de la connexion', {
              body: 'Identifiants incorrects. Veuillez réessayer.',
            });
          }
        }
      } else {
        console.log(`An error occurred during login for email: ${email}`);
        setError('Une erreur s\'est produite lors de la connexion.');
        setAuthenticated(false);
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Erreur de connexion', {
            body: 'Une erreur s\'est produite lors de la connexion.',
          });
        }
      }
    } catch (error) {
      console.error(error);
      console.log(`An error occurred during login for email: ${email}`);
      setError('Une erreur s\'est produite lors de la connexion.');
      setAuthenticated(false);
  
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Erreur de connexion', {
          body: 'Une erreur s\'est produite lors de la connexion.',
        });
      }
    }
  };
  
  


  return (
    <div className="admin-login-container">
      <img src={sanlamLogo} alt="Sanlam Logo" className="sanlam-logo5" />
      <h2 className="auth-title5">Authentification</h2>

      <form className="admin-login-form">
        <div className="form-group5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group5">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {authenticated ? (
          <Link to={`/adminDashboard?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`}>
          <button className='5' type="button">Connexion</button>
        </Link>
        
          //<Link to="/adminDashboard" state={{ firstName, lastName }} >
           // <button type="button">Connexion</button>
         // </Link>
        ) : (
          <button className='5' type="button" onClick={handleLogin}>
            Connexion
          </button>
        )}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
