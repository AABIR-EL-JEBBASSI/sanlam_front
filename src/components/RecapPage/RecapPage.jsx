import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { useFormData } from '../../components/FormPage/FormDataContext';
import { useNavigate } from 'react-router-dom';

const RecapPage = () => {
  const navigate = useNavigate();
  const signatureRef = useRef(null);
  const pageRef = useRef(null);
  const { formData} = useFormData();
  if (!formData) {
    console.error('No formData found');
  } else {
    console.log('Données du formulaire dans RecapPage :', formData);
    console.log('URL de la signature :', formData.signature);
  }
  useEffect(() => {
    // Retrieve the signature data from local storage
    const signatureData = localStorage.getItem('signatureData');

    if (signatureData) {
      const { signatureImageURL, name, date } = JSON.parse(signatureData);

      // Update the RecapPage with the signature data
      signatureRef.current.src = signatureImageURL;

      // Update the name and date in the formData object
      formData.name = name;
      formData.date = date;
    }
  }, [formData]); 


  const handleGeneratePDF = async () => {
    if (!pageRef.current) {
      console.error('Élément de page introuvable.');
      return;
    }
  
    const options = {
      margin: 10,
      filename: 'recapitulatif.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    // Utilize pageRef.current to capture the entire page
    const pdf = await html2pdf().from(pageRef.current).set(options).outputPdf();
  
    // Create a FormData object to send the PDF to the backend
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('recapitulatif', pdf); // Make sure the field name matches the backend
  
    try {
      const response = await fetch('https://localhost:7214/api/Demands/upload', {
        method: 'POST',
        body: formDataToSubmit,
      });
  
      if (response.ok) {
        console.log('Fichier PDF envoyé avec succès.');
        // You can redirect the user or perform other actions here
      } else {
        console.error('Erreur lors de l\'envoi du fichier PDF.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
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
      <p>Signature :</p>
      <p>Nom et Prénom du signataire: {formData.name}</p>
      <p>Date de signature: {formData.date}</p>
      
      <img ref={signatureRef} alt="Signature" />
      

      <div className="navigation-buttons">
        <Link to="/signature">
          <button>Précédent</button>
        </Link>
        <button onClick={handleGeneratePDF}>Envoyer</button>
      </div>
    </div>
  );
};

export default RecapPage;
