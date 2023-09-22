import React, { useState, useEffect } from 'react';
import './demandesEnCours.css';
import { Link } from 'react-router-dom';


const EnCoursDemands = () => {
  const [searchText, setSearchText] = useState('');
  const [clientsWithEnCoursDemands, setClientsWithEnCoursDemands] = useState([]);
  const [filteredClientsWithEnCoursDemands, setFilteredClientsWithEnCoursDemands] = useState([]);

  // Effect pour récupérer les clients avec des demandes en cours
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7214/api/Demands/clients-with-en-cours-demands');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données.');
        }
        const data = await response.json();
        console.log('Clients avec des demandes en cours récupérés depuis l\'API :', data);
        setClientsWithEnCoursDemands(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients avec des demandes en cours depuis l\'API', error);
      }
    };

    fetchData();
  }, []); // Effect exécuté une seule fois

  // Effect pour filtrer les clients en fonction du texte de recherche
  useEffect(() => {
    const searchTerm = searchText.trim().toLowerCase();
    const filtered = clientsWithEnCoursDemands.filter((client) => {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      return fullName.includes(searchTerm) || client.email.toLowerCase().includes(searchTerm);
    });

    setFilteredClientsWithEnCoursDemands(filtered);
  }, [searchText, clientsWithEnCoursDemands]);

  const handleSearch = () => {
    // Vous pouvez ajouter une logique de recherche supplémentaire ici si nécessaire
  };

 
  
  return (
    <div className="client-list-container">
      <div className="sidebar">
        {/* Admin Info */}
       

        <ul className="menu">
          <li><Link to="/adminDashBoard">Tableau de bord</Link></li>
          
          <li><Link to="/clientListPage">Liste des clients</Link></li>
          <li><Link to="/newDemands">Nouvelles non traitées</Link></li>
          <li className="active">Demandes en cours</li>
          <li><Link to="/finishedDemands">Demandes traitées</Link></li>
          
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
            {filteredClientsWithEnCoursDemands.map((client) => (
                <tr key={client.id}>
                  <td>{client.lastName}</td>
                  <td>{client.firstName}</td>
                  <td>{client.adress}</td>
                  <td>{client.phoneNumber}</td>
                  <td>{client.email}</td>
                  
                  <td>
                    <Link to={`/demandPage/${client.id}`}>
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

export default EnCoursDemands;
