import React, { useState, useEffect } from 'react';
import '../../components/ClientListPage/ClientListPage.css';
import { Link } from 'react-router-dom';

const FinishedDemands = () => {
  const [searchText, setSearchText] = useState('');
  const [clientsWithFinishedDemands, setClientsWithFinishedDemands] = useState([]);

  useEffect(() => {
    // Utilisez une requête à votre API pour récupérer les clients avec des demandes terminées
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7214/api/Demands/clients-with-finished-demands');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données.');
        }
        const data = await response.json();
        console.log('Clients avec des demandes terminées récupérés depuis l\'API :', data);
        setClientsWithFinishedDemands(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients avec des demandes terminées depuis l\'API', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    // Vous pouvez mettre ici une logique de recherche si nécessaire
    // Par exemple, déclencher une nouvelle requête à l'API
    // avec le texte de recherche pour obtenir les résultats mis à jour
  };
  
  return (
    <div className="client-list-container">
      <div className="sidebar">
        {/* Admin Info */}
       

        <ul className="menu">
          <li><Link to="/adminDashBoard">Tableau de bord</Link></li>
          
          <li><Link to="/clientListPage">Liste des clients</Link></li>
          <li><Link to="/newDemands">Demandes non traitées</Link></li>
          
          <li><Link to="/demandesEnCours">Demandes en cours</Link></li>
          <li className="active">Demandes traitées</li>
          
          <li><Link to= "/login">Déconnexion</Link></li>
        </ul>
      </div>

      <div className="content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search" onClick={handleSearch}>Rechercher</button>
        </div>

        <div className="client-table-container">
          <table className="client-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Adresse</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {clientsWithFinishedDemands.map((client) => (
              <tr key={client.id}>
                <td>{client.lastName}</td>
                <td>{client.firstName}</td>
                <td>{client.adress}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.email}</td>
                <td>
                  <Link to={`/demandPage3/${client.id}`}>
                    <button className="search">Afficher</button>
                  </Link>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinishedDemands;
