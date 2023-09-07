// src/components/RecapPage/RecapPage.js
import React from 'react';
import {Link} from 'react-router-dom';
import { useFormData } from '../../components/FormPage/FormDataContext'; // Assurez-vous que le chemin est correct


  const RecapPage = ({ formData }) => {
  return (
    <div>
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
      <img src={formData.signature} alt="Signature" />

      <div className="navigation-buttons">
        <Link to="/signature">
          <button>Précédent</button>
        </Link>
        <button>Envoyer</button>
      </div>
    </div>
  );
};

export default RecapPage;
