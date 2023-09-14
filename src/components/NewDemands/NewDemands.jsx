import React, { useState, useEffect } from 'react';

const NewDemands = () => {
  const [demands, setDemands] = useState([]);

  useEffect(() => {
    // Ici, vous devrez ajouter la logique pour récupérer les demandes depuis votre API ou votre source de données.
    // Mettez à jour le tableau de demandes (demands) avec les données récupérées.
  }, []);

  const handleDeleteDemand = (demandId) => {
    // Ajoutez la logique pour supprimer la demande avec l'ID demandId.
    // Mettez à jour le tableau de demandes après la suppression.
  };

  const handleStartProcessing = (demandId) => {
    // Ajoutez la logique pour commencer le traitement de la demande avec l'ID demandId.
    // Cela peut impliquer de rediriger l'utilisateur vers une autre page ou d'afficher un formulaire de traitement.
  };

  return (
    <div className="new-demands">
      <h2>Liste des Nouvelles Demandes</h2>
      <table>
        <thead>
          <tr>
            <th>Nom du Client</th>
            <th>Prénom</th>
            <th>Demande</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demands.map((demand) => (
            <tr key={demand.id}>
              <td>{demand.nomClient}</td>
              <td>{demand.prenomClient}</td>
              <td>{demand.demande}</td>
              <td>
                <button onClick={() => handleDeleteDemand(demand.id)}>
                  Supprimer Demande
                </button>
                <button onClick={() => handleStartProcessing(demand.id)}>
                  Commencer Traitement
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewDemands;
