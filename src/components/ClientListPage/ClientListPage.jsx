import React, { useState, useEffect } from 'react';
import './ClientListPage.css';
import { Link } from 'react-router-dom';

const ClientList = () => {
  const [searchText, setSearchText] = useState('');
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    // Utilisez une requête à votre API backend pour récupérer la liste des clients
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7214/api/customers');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données.');
        }
        const data = await response.json();
        console.log('Données récupérées depuis l\'API :', data);
        setClients(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients depuis l\'API', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrer les clients en fonction du texte de recherche
    const filtered = clients.filter(client =>
      (client.lastName && client.lastName.toLowerCase().includes(searchText.toLowerCase())) ||
      (client.firstName && client.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
      (client.address && client.address.toLowerCase().includes(searchText.toLowerCase())) ||
      (client.email && client.email.toLowerCase().includes(searchText.toLowerCase()))
    );
    console.log('Clients filtrés :', filtered);
    setFilteredClients(filtered);
  }, [searchText, clients]);

  const handleSearch = () => {
    // Vous pouvez mettre ici une logique de recherche si nécessaire
    // Par exemple, déclencher une nouvelle requête à l'API
    // avec le texte de recherche pour obtenir les résultats mis à jour
  };
  // ...
  const handleSendLink = async (clientId, clientEmail) => {
    try {
      // Envoyez une demande au backend pour envoyer l'e-mail au client
      const response = await fetch('https://localhost:7214/api/formulaire/envoyer-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientEmail}), // Remplacez par l'e-mail réel du client
      });

      if (response.ok) {
        console.log('E-mail envoyé avec succès au client.');
        // Ajoutez ici la logique pour afficher une confirmation à l'utilisateur si nécessaire
      } else {
        console.error('Erreur lors de l\'envoi de l\'e-mail au client.');
        // Ajoutez ici la logique pour gérer les erreurs d'envoi de l'e-mail
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
      // Ajoutez ici la logique pour gérer les erreurs
    }
  };

  return (
    <div className="client-list-container">
      <div className="sidebar">
        {/* Admin Info */}
        <div className="admin-info">
          <h3>Nom Prénom</h3>
        </div>

        <ul className="menu">
          <li><Link to="/adminDashBoard">Tableau de bord</Link></li>
          <li className="active">Clients</li>
          <li><Link to="/newDemands">Demandes non traitées</Link></li>
          <li><Link to="/demandesEnCours">Demandes en cours</Link></li>
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
          <button onClick={handleSearch}>Rechercher</button>
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
            {filteredClients.map((client) => {
            console.log('Données du client affichées :', client); // Ajoutez cette ligne
            return (
                <tr key={client.id}>
                  <td>{client.lastName}</td>
                  <td>{client.firstName}</td>
                  <td>{client.address}</td>
                  <td>{client.phoneNumber}</td>
                  <td>{client.email}</td>
                  <td>
                    <button onClick={() => handleSendLink(client.id, client.email)}>Envoyer</button>
                  </td>
                </tr>
            );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientList;