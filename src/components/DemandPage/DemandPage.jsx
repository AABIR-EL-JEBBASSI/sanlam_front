import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importez useParams et Link
import './DemandPage.css';

function DemandPage() {
  const { clientId } = useParams(); // Utilisez le hook useParams pour obtenir le clientId
  const [clientData, setClientData] = useState({});
  const [carData, setCarData] = useState({});
  const [photosData, setPhotosData] = useState([]);
  const [signatureData, setSignatureData] = useState({});
  const [loading, setLoading] = useState(true);
  const [demandStatut, setDemandStatut] = useState('Nouvelle demande');

  useEffect(() => {
    console.log("ID du client :", clientId);
    console.log("URL du client API :", `https://localhost:7214/api/Customers/${clientId}`);
    
    // Récupérer les données du client en utilisant l'ID dans clientId
    fetch(`https://localhost:7214/api/Customers/${clientId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données du client :", data);
        setClientData(data);

        // Récupérer les données de la voiture en utilisant l'ID du client
        return fetch(`https://localhost:7214/api/Cars/${data.id}`);
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Données de la voiture :", data);
        setCarData(data);

        // Récupérer les photos en utilisant l'ID de la voiture
        return fetch(`https://localhost:7214/api/Photos/${data.id}`);
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Photos associées :", data);
        setPhotosData(data);

        // Récupérer les données de la signature en utilisant l'ID du client
        return fetch(`https://localhost:7214/api/Signatures/${clientId}`);
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Données de la signature :", data);
        setSignatureData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Une erreur s\'est produite', error);
        setLoading(false);
      });
  }, [clientId]);
  const updateDemandStatut = () => {
    if (demandStatut === 'Nouvelle demande') {
      // Mettre à jour le statut dans la base de données en utilisant une requête PUT
      fetch(`https://localhost:7214/api/Demands/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'En cours' }), // Mettez à jour le statut en "En cours"
      })
        .then((response) => response.json())
        .then(() => {
          // Statut de la demande mis à jour avec succès
          setDemandStatut('En cours'); // Mettez à jour le statut local
          console.log('Statut de la demande mis à jour avec succès.');
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du statut de la demande :', error);
        });
    }
  };

  return (
    <div>
      <Link to="/newDemands">Retour</Link> {/* Utilisez Link pour naviguer vers la page précédente */}
      {demandStatut === 'Nouvelle demande' && (
         <button onClick={updateDemandStatut}>Commencer</button>
      )}
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div>
          <h2>Informations sur le client</h2>
          <p>Nom : {clientData.lastName}</p>
          <p>Prénom : {clientData.firstName}</p>
          <p>Email : {clientData.email}</p>
          <p>Téléphone : {clientData.phoneNumber}</p>
          <p>Adresse : {clientData.adress}</p>

          <h2>Informations sur la voiture</h2>
          <p>Marque : {carData.brand}</p>
          <p>Modèle : {carData.model}</p>
          <p>Plaque d'immatriculation : {carData.numberPlate}</p>

          <h2>Photos associées</h2>
          <ul>
            {photosData.map((photo) => (
              <li key={photo.id}>
                <img src={photo.imageData} alt={photo.photoName} />
                <p>Date : {photo.date}</p>
                <p>Localisation : {photo.location}</p>
              </li>
            ))}
          </ul>

          <h2>Signature</h2>
          <p>Nom du signataire : {signatureData.signatureName}</p>
          <p>Date de la signature : {signatureData.signatureDate}</p>
        </div>
      )}
    </div>
  );
}

export default DemandPage;
