import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import './Logo.css';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      navigate('/form');
    }, 1500);
  }, [navigate]);

  return (
    <div className="home-page">
      {isLoading ? (
        <div className="loading">
          <div className="logo-container">
            <Logo />
          </div>
        </div>
      ) : (
        <div className="content1">
          {/* Contenu de la page après le chargement */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
