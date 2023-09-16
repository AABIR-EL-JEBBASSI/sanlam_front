import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PhotoCapture from '../../components/PhotosPage/PhotoCapture';
import { useFormData } from '../../components/FormPage/FormDataContext';
import { usePhotoContext } from '../../components/PhotosPage/PhotoContext';

const RecapPage = () => {
  const { capturedPhotos } = usePhotoContext();
  const signatureRef = useRef(null);
  const pageRef = useRef(null);
  const { formData} = useFormData();
  if (!formData) {
    console.error('No formData found');
  } else {
    console.log('Données du formulaire dans RecapPage :', formData);
    console.log('URL de la signature :', formData.signature);
  }
  const [signatureInfo, setSignatureInfo] = useState({ name: '', date: '' });
  const [ setCapturedPhotos] = useState({});
  console.log('Captured Photos:', capturedPhotos);
  useEffect(() => {
    // Retrieve the signature data from local storage
    const signatureData = localStorage.getItem('signatureData');

    if (signatureData) {
      const { signatureImageURL, name, date } = JSON.parse(signatureData);

      // Update the RecapPage with the signature data
      signatureRef.current.src = signatureImageURL;

      // Update the name and date in the formData object
      setSignatureInfo({ name, date });
    }
    const photosData = localStorage.getItem('capturedPhotosData');
    if (photosData) {
      const parsedPhotosData = JSON.parse(photosData);
      setCapturedPhotos(parsedPhotosData);
      console.log('Parsed Photos Data:', parsedPhotosData);
    }
  }
  );
  const handleSubmitCar = async () => {
    // Créez un objet pour représenter les données de la voiture
    const carData = {
      brand: formData.carMake, // Utilisez les données du formulaire pour remplir ces champs
      model: formData.carModel,
      numberPlate: formData.carRegistration,
    };
  
    try {
      // Recherchez le client correspondant en utilisant le nom et le prénom
      const customerResponse = await fetch(`https://localhost:7214/api/Customers?lastName=${formData.lastName}&firstName=${formData.firstName}`);
      
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        
        if (customerData.length > 0) {
          // Si un client correspondant est trouvé, utilisez son ID pour attribuer la voiture
          const customerId = customerData[0].id; // Supposons que l'ID du client soit dans la réponse
          carData.customerId = customerId;
          
          // Effectuez une requête POST vers votre backend pour créer la voiture
          const carResponse = await fetch('https://localhost:7214/api/Cars', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData), // Convertissez l'objet en JSON
          });
  
          if (carResponse.ok) {
            // La requête a réussi, vous pouvez gérer la réponse ici si nécessaire
            console.log('Car data successfully sent to the backend.');
          } else {
            // La requête a échoué, vous pouvez gérer les erreurs ici si nécessaire
            console.error('Failed to send car data to the backend.');
          }
        } else {
          console.error('No matching customer found.');
        }
      } else {
        // La requête pour rechercher le client a échoué
        console.error('Failed to search for customer.');
      }
    } catch (error) {
      // Une erreur s'est produite lors de la requête
      console.error('An error occurred while sending car data:', error);
    }
  };

  const handleSubmitPhotos = async () => {
    try {
      // Recherchez le client correspondant en utilisant le nom et le prénom
      const customerResponse = await fetch(`https://localhost:7214/api/Customers?lastName=${formData.lastName}&firstName=${formData.firstName}`);
      
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        
        if (customerData.length > 0) {
          // Si un client correspondant est trouvé, utilisez son ID pour créer une nouvelle voiture
          const customerId = customerData[0].id; // Supposons que l'ID du client soit dans la réponse
          
          // Créez une nouvelle voiture en envoyant une requête POST au backend
          const carResponse = await fetch('https://localhost:7214/api/Cars', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId }), // Utilisez le customerId pour créer la voiture
          });
          
          if (carResponse.ok) {
            // La voiture a été créée avec succès, vous pouvez gérer la réponse ici si nécessaire
            const carData = await carResponse.json();
            const carId = carData.id; // Récupérez le carId généré automatiquement
            
            // Maintenant, vous avez le customerId et le carId, vous pouvez envoyer les photos
            // Liste des noms des photos
            const photoNames = [
              'compteur',
              'face_avant',
              'face_arriere',
              'face_conducteur',
              'face_passager',
              'cin_recto',
              'cin_verso',
              'permis_recto',
              'permis_verso',
              'carte_grise_recto',
              'carte_grise_verso',
            ];

            // Parcourez la liste des noms de photos et envoyez chaque photo au backend
            for (const photoName of photoNames) {
              const photoData = capturedPhotos[photoName]; // Supposons que capturedPhotos contient les données de chaque photo
              if (!photoData) {
                console.error(`No data found for photo: ${photoName}`);
                continue; // Passez à la prochaine photo si aucune donnée n'est disponible
              }

              const photoToSend = {
                carId,
                customerId,
                photoName,
                date: photoData.date, // Date de la photo
                location: photoData.location, // Emplacement de la photo
                imageData: photoData.imageDataURL, // Image en base64
              };

              // Effectuez une requête POST pour envoyer la photo au backend
              const response = await fetch('https://localhost:7214/api/Photos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(photoToSend), // Convertissez l'objet en JSON
              });

              if (response.ok) {
                // La photo a été envoyée avec succès, vous pouvez gérer la réponse ici si nécessaire
                console.log(`Photo ${photoName} successfully sent to the backend.`);
              } else {
                // La requête a échoué, vous pouvez gérer les erreurs ici si nécessaire
                console.error(`Failed to send photo ${photoName} to the backend.`);
              }
            }
          } else {
            console.error('Failed to create a new car.');
          }
        } else {
          console.error('No matching customer found.');
        }
      } else {
        console.error('Failed to search for customer.');
      }
    } catch (error) {
      // Une erreur s'est produite lors de la requête
      console.error('An error occurred while processing customer and car data:', error);
    }
  };

  const handleSubmitDemand = async () => {
    try {
      // Recherchez le client correspondant en utilisant le nom et le prénom
      const customerResponse = await fetch(`https://localhost:7214/api/Customers?lastName=${formData.lastName}&firstName=${formData.firstName}`);
      
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        
        if (customerData.length > 0) {
          // Si un client correspondant est trouvé, utilisez son ID pour créer une nouvelle demande
          const customerId = customerData[0].id; // Supposons que l'ID du client soit dans la réponse
          
          // Créez une nouvelle demande en envoyant une requête POST au backend
          const demandResponse = await fetch('https://localhost:7214/api/Demands', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              statut: 'Nouvelle demande',
              idClient: customerId,
              recapitulatif: formData.signature, // Supposons que formData.signature contient la signature
            }),
          });
          
          if (demandResponse.ok) {
            // La demande a été créée avec succès, vous pouvez gérer la réponse ici si nécessaire
            console.log('Demand data successfully sent to the backend.');
          } else {
            console.error('Failed to create a new demand.');
          }
        } else {
          console.error('No matching customer found.');
        }
      } else {
        console.error('Failed to search for customer.');
      }
    } catch (error) {
      // Une erreur s'est produite lors de la requête
      console.error('An error occurred while processing demand data:', error);
    }
  };
  
  const handleSendData = async () => {
    await handleSubmitCar();
    await handleSubmitPhotos();
    await handleSubmitDemand();
  };
    
         
  return (
    <div ref={pageRef}>
      <h2>Récapitulatif des données du formulaire :</h2>
      <p>Prénom : {formData.firstName}</p>
      <p>Nom : {formData.lastName}</p>
      <p>Email : {formData.email}</p>
      <p>Téléphone : {formData.phone}</p>
      <p>Adresse : {formData.adress}</p>
      <p>Matricule de la voiture : {formData.carRegistration}</p>
      <p>Marque de la voiture : {formData.carMake}</p>
      <p>Modèle de la voiture : {formData.carModel}</p>

      <h2>Photos Capturées :</h2>
{Object.keys(capturedPhotos).map((photoName) => (
  <div key={photoName}>
    <h3>{photoName}</h3>
    <img src={capturedPhotos[photoName].imageDataURL} alt={photoName} />
    <p>Date: {capturedPhotos[photoName].date}</p>
    <p>Latitude: {capturedPhotos[photoName].location.latitude}</p>
    <p>Longitude: {capturedPhotos[photoName].location.longitude}</p>
    {/* You can add more information if needed */}
  </div>
))}

      <h2>Signature :</h2>
      <p>Nom et Prénom du signataire: {signatureInfo.name}</p>
      <p>Date de signature: {signatureInfo.date}</p>
      
      <img ref={signatureRef} alt="Signature" />
      

      <div className="navigation-buttons">
        <Link to="/signature">
          <button>Précédent</button>
        </Link>
        <button onClick={handleSendData}>Envoyer</button>
      </div>
    </div>
  );
};


export default RecapPage;
