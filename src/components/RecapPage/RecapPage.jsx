import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PhotoCapture from '../../components/PhotosPage/PhotoCapture';
import { useFormData } from '../../components/FormPage/FormDataContext';
import { usePhotoContext } from '../../components/PhotosPage/PhotoContext';
import isValidBase64 from 'is-base64';
import "./RecapPage.css";


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
  const [setCapturedPhotos] = useState({});
  console.log('Captured Photos:', capturedPhotos);
  useEffect(() => {
    const signatureData = localStorage.getItem('signatureData');

    if (signatureData) {
      const { signatureImageURL, name, date } = JSON.parse(signatureData);
      signatureRef.current.src = signatureImageURL;
      setSignatureInfo({ name, date });
    }

    const photosData = localStorage.getItem('capturedPhotosData');
    if (photosData) {
      const parsedPhotosData = JSON.parse(photosData);
      // Update the state with the retrieved photos data
      setCapturedPhotos(parsedPhotosData);
      console.log('Parsed Photos Data:', parsedPhotosData);
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  if (!formData) {
    console.error('No formData found');
    // You might want to handle this case gracefully, e.g., by rendering a loading indicator.
    return null;
  }

  console.log('Données du formulaire dans RecapPage:', formData);
  console.log('URL de la signature:', formData.signature);
  console.log('Captured Photos:', capturedPhotos);

  // The rest of your component code...


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
      const customerResponse = await fetch(
        `https://localhost:7214/api/Customers?lastName=${formData.lastName}&firstName=${formData.firstName}`
      );
  
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
  
        if (customerData.length > 0) {
          const customerId = customerData[0].id;
          const carResponse = await fetch('https://localhost:7214/api/Cars', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId }),
          });
  
          if (carResponse.ok) {
            const carData = await carResponse.json();
            const carId = carData.id;
  
            const photoNames = [
              'Compteur',
              'Face avant',
              'face arriere',
              'face latérale conducteur',
              'face latérale passager',
              'Cin recto',
              'Cin verso',
              'Permis recto',
              'Permis verso',
              'Carte grise recto',
              'Carte grise verso',
            ];
  
            for (const photoName of photoNames) {
              const photoData = capturedPhotos[photoName];
              if (!photoData) {
                console.error(`No data found for photo: ${photoName}`);
                continue;
              }
              

              console.log(`Processing photo: ${photoName}`);

              
              if (!isValidBase64(photoData.imageData, { mimeRequired: true })) {
                console.error(`Invalid base64 image data for photo: ${photoName}`);
                continue;
              }
              console.log(`Sending photo ${photoName} to the backend...`);
              const locationString = `${photoData.location.latitude},${photoData.location.longitude}`;
  
              const photoToSend = {
                carId,
                customerId,
                photoName,
                date: photoData.date,
                location: locationString, // Use the validated location string
                imageData: photoData.imageData,
              };
  
              const response = await fetch('https://localhost:7214/api/Photos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(photoToSend),
              });
  
              if (response.ok) {
                console.log(`Photo ${photoName} successfully sent to the backend.`);
              } else {
                console.error(`Failed to send photo ${photoName} to the backend.`);
                const responseBody = await response.text();
                console.error(`Response body: ${responseBody}`);
              }
            }
          } else {
            console.error('Failed to create a new car.');
            const responseBody = await carResponse.text();
            console.error(`Car response body: ${responseBody}`);
          }
        } else {
          console.error('No matching customer found.');
        }
      } else {
        console.error('Failed to search for customer.');
      }
    } catch (error) {
      console.error('An error occurred while processing customer and car data:', error);
    }
  };
  
  

  const handleSubmitDemand = async () => {
    try {
    
      const customerResponse = await fetch(`https://localhost:7214/api/Customers?lastName=${formData.lastName}&firstName=${formData.firstName}`);
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        if (customerData.length > 0) {
          const customerId = customerData[0].id;
          const demandResponse = await fetch('https://localhost:7214/api/Demands', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              statut: 'Nouvelle demande',
              idClient: customerId,
              signature: formData.signature, 
            }),
          });
          if (demandResponse.ok) {
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
    try {
      console.log('Calling handleSubmitCar');
      await handleSubmitCar();
      console.log('Calling handleSubmitPhotos');
      await handleSubmitPhotos();
      console.log('Calling handleSubmitDemand');
      await handleSubmitDemand();
    } catch (error) {
      console.error('An error occurred in handleSendData:', error);
    }
  };
  
  
  const showNotification = () => {
    console.log('Button clicked');
    const confirmSend = window.confirm('Voulez-vous vraiment envoyer la demande?');
    console.log('Confirm Send:', confirmSend);
    if (confirmSend) {
      
      console.log('Before handleSendData');
      handleSendData();
      console.log('After handleSendData');
     
    } else {
      // L'utilisateur a annulé l'envoi
    }
    
  };
         
  return (
    <div ref={pageRef}>
      <div className="blue-container">
      <h2>Récapitulatif des données du formulaire :</h2>
      <p>Prénom : {formData.firstName}</p>
      <p>Nom : {formData.lastName}</p>
      <p>Email : {formData.email}</p>
      <p>Téléphone : {formData.phone}</p>
      <p>Adresse : {formData.adress}</p>
      <p>Matricule de la voiture : {formData.carRegistration}</p>
      <p>Marque de la voiture : {formData.carMake}</p>
      <p>Modèle de la voiture : {formData.carModel}</p>
      </div>
      <div className="blue-container">
      <h2>Photos Capturées :</h2>
{Object.keys(capturedPhotos).map((photoName) => (
  <div key={photoName}>
    <h3>{photoName}</h3>
    <img src={capturedPhotos[photoName].imageData} alt={photoName} />
    <p>Date: {capturedPhotos[photoName].date}</p>
    <p>Latitude: {capturedPhotos[photoName].location.latitude}</p>
    <p>Longitude: {capturedPhotos[photoName].location.longitude}</p>
    {/* You can add more information if needed */}
  </div>
))}
</div>
<div className="blue-container">
      <h2>Signature :</h2>
      <p>Nom et Prénom du signataire: {signatureInfo.name}</p>
      <p>Date de signature: {signatureInfo.date}</p>
      
      <img ref={signatureRef} alt="Signature" />
      </div>

      <div className="navigation-buttons">
        <Link to="/signature">
          <button>Précédent</button>
        </Link>
        
        <button onClick={showNotification}>Envoyer</button>
        
      </div>
    </div>
  );
};


export default RecapPage;
