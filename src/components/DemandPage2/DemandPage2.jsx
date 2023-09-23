import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importez useParams et Link
import './DemandPage2.css';

function DemandPage2() {
  const { clientId } = useParams(); // Utilisez le hook useParams pour obtenir le clientId
  const [clientData, setClientData] = useState({});
  const [carData, setCarData] = useState({});
  const [photosData, setPhotosData] = useState([]);
  const [demandData, setDemandData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demandId, setDemandId] = useState(null); 
  const [demandStatut, setDemandStatut] = useState('En cours');
  
  useEffect(() => {
    console.log("ID du client :", clientId);
    console.log("URL du client API :", `https://localhost:7214/api/Customers/${clientId}`);
    let carId;
    // Récupérer les données du client en utilisant l'ID dans clientId
    fetch(`https://localhost:7214/api/Customers/${clientId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données du client :", data);
        setClientData(data);
  
        // Récupérer l'ID de la voiture du client
       
  
        // Récupérer les données de la voiture en utilisant l'ID de la voiture
        return fetch(`https://localhost:7214/api/Cars?customerId=${clientId}`);
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Données de la voiture :", data);
        setCarData(data);
        console.log('clientId',clientId);
        const carId = data.find((car) => car.customerId === clientId)?.id;
        // Récupérer les photos en utilisant l'ID de la voiture
        console.log('carId',carId);
    // Remplacez la requête API pour récupérer les photos en fonction du `clientId`
return fetch(`https://localhost:7214/api/Photos?customerId=${clientId}`)
.then((response) => response.json())
.then((data) => {
  console.log("Toutes les photos du client :", data);

  // Filtrer les photos en fonction du `clientId`
  const filteredPhotos = data.filter((photo) => photo.customerId === clientId);

  console.log("Photos associées filtrées :", filteredPhotos);
  setPhotosData(filteredPhotos);
})
.catch((error) => {
  console.error("Erreur lors de la récupération des photos du client :", error);
});

        // Récupérer les données de la signature en utilisant l'ID du client
        
      })
  // Récupérer les données de la signature en utilisant l'ID du client
return fetch(`https://localhost:7214/api/Demands?customerId=${clientId}`)
.then((response) => response.json())
.then((data) => {
  console.log("Données de la signature :", data);
     const clientDemand = data.find((demand) => demand.customerId === clientId); // Trouvez la première demande avec une signature

  if (clientData) {
    setDemandData(clientDemand);
  } else {
    // Aucune signature trouvée, vous pouvez gérer cela comme vous le souhaitez
    console.log("Aucune signature trouvée.");
    // Vous pouvez également définir une valeur par défaut ici, par exemple :
    // setDemandData({ signature: "URL de la signature par défaut" });
  }

  setLoading(false);
})
.catch((error) => {
  console.error("Une erreur s'est produite", error);
  setLoading(false);
});

  }, [clientId]);
  console.log('clientId avant l\'appel à getDemandIdByClientId :', clientId);
  const updateDemandStatut = async () => {
    try {
      if (clientData && clientData.id) {
        const clientIdToUpdate = clientData.id;
  
        // Remarque : vous devrez peut-être ajuster cette partie pour trouver la demande correcte à mettre à jour
        // Si demandData est une liste d'objets, la logique actuelle ne fonctionnera pas.
        // Vous devrez rechercher la demande appropriée en fonction de vos données réelles.
  
        const matchingDemand = demandData; // Mettez à jour la logique de recherche ici
  
        if (matchingDemand) {
          const demandIdToUpdate = matchingDemand.id;
  
          const response = await fetch(`https://localhost:7214/api/Demands/${demandIdToUpdate}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Statut: 'Demande achevée' }),
          });
  
          if (response.ok) {
            console.log('Statut de la demande mis à jour avec succès dans la base de données.');
          } else {
            console.error('Erreur lors de la mise à jour du statut de la demande dans la base de données :', response.statusText);
          }
        } else {
          console.error('Aucune demande correspondant au client actuel n\'a été trouvée.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la demande :', error);
    }
  };
  

  return (
    <div className="demand-page">
      <Link to="/demandesEnCours" className="back-link">
        Retour
      </Link>
      {demandStatut === 'En cours' && (
        <button className="start-button" onClick={updateDemandStatut}>
          Terminer
        </button>
      )}
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div>
          <h2>Informations sur le client</h2>
          <div className="client-info">
            <p>Nom : {clientData.lastName}</p>
            <p>Prénom : {clientData.firstName}</p>
            <p>Email : {clientData.email}</p>
            <p>Téléphone : {clientData.phoneNumber}</p>
            <p>Adresse : {clientData.adress}</p>
          </div>

          <h2>Informations sur la voiture</h2>
          <div className="car-info">
            <p>Marque : {carData.length > 0 ? carData[0].brand : 'Aucune donnée de voiture'}</p>
            <p>Modèle : {carData.length > 0 ? carData[0].model : 'Aucune donnée de voiture'}</p>
            <p>Plaque d'immatriculation : {carData.length > 0 ? carData[0].numberPlate : 'Aucune donnée de voiture'}</p>
          </div>

          <h2>Photos associées</h2>
          <ul className="photos-list">
            {photosData.map((photo) => (
              <li key={photo.id} className="photo-item">
                <p>{photo.photoName}</p>
                <img src={photo.imageData} alt={photo.photoName} className="photo-image" />
                <p>Date : {photo.date}</p>
                <p>Localisation : {photo.location}</p>
              </li>
            ))}
          </ul>

          <h2>Signature</h2>
          <div className="signature-info">
          <p>Nom et prenom: {clientData.lastName} {clientData.firstName}</p>
            
          <img src={demandData.signature} alt="Signature" />

          </div>
        </div>
      )}
    </div>
  );
}

export default DemandPage2;
