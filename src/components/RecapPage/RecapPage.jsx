import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFormData } from '../../components/FormPage/FormDataContext';

const RecapPage = () => {

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
  }, []); 



  
    
         
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
      <p>Signature :</p>
      <p>Nom et Prénom du signataire: {signatureInfo.name}</p>
      <p>Date de signature: {signatureInfo.date}</p>
      
      <img ref={signatureRef} alt="Signature" />
      

      <div className="navigation-buttons">
        <Link to="/signature">
          <button>Précédent</button>
        </Link>
        <button >Envoyer</button>
      </div>
    </div>
  );
};


export default RecapPage;
