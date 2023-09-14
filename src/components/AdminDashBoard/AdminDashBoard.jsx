import React from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const AdminDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  console.log('First Name:', firstName);
  console.log('Last Name:', lastName);
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Admin Info */}
        <div className="admin-info">
        <h3>{`${firstName} ${lastName}`}</h3>
        </div>
        
        <ul className="menu">
          <li className="active">Tableau de bord</li>
          <li><Link to="/clientListPage">Clients</Link></li>
          <li><Link to="/newDemands">Nouveaux demandes </Link></li>
          
          <li>Demandes en cours</li>
          <li>Demandes traitées</li>
          <li>Tables et graphiques</li>
          <li>Déconnexion</li>
        </ul>
      </div>

      {/* Content */}
      <div className="content">
        <header className="header">
          <div className="search-bar">
            <input type="text" placeholder="Rechercher..." />
            <button>
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="logo">
            <img src="src\components\AdminDashBoard\SanlamLogo.png" alt="Sanlam Logo" />
          </div>
          
        </header>
        <div className="summary-container">
          <div className="summary-item">
            <div className="icon demandes-icon"></div>
            <div className="summary-text">
              <p>Demandes non traitées</p>
              <p>100</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="icon en-cours-icon"></div>
            <div className="summary-text">
              <p>En cours de traitement</p>
              <p>50</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="icon traites-icon"></div>
            <div className="summary-text">
              <p>Demandes traitées</p>
              <p>200</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="icon total-icon"></div>
            <div className="summary-text">
              <p>Total des demandes</p>
              <p>350</p>
            </div>
          </div>
        </div>
        <div className="chart-container">
          {/* Insérez ici vos graphiques */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
