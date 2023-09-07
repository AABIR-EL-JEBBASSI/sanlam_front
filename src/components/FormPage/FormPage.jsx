// src/components/FormPage/FormPage.js
import React, {useEffect, useState } from 'react';
import './FormPage.css';
import { Link} from 'react-router-dom';
import { useFormData } from './FormDataContext';

const FormPage = () => {
  const { formData, setFormData } = useFormData(); 
  const [showNotification, setShowNotification] = useState(false);
  


  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, [setFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Copiez l'objet formData existant et mettez à jour la propriété appropriée
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData)
  };
    // Sauvegarder les données du formulaire dans le localStorage à chaque changement
    useEffect(() => {
      localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const isFormComplete = () => {
      return (
        formData.firstName !== '' &&
        formData.lastName !== '' &&
        formData.email !== '' &&
        formData.phone !== '' &&
        formData.adress !== '' &&
        formData.carRegistration !== '' &&
        formData.carMake !== '' &&
        formData.carModel !== ''
      );
    };
    useEffect(() => {
      if (!isFormComplete()) {
        setShowNotification(true);
      } else {
        setShowNotification(false);
      }
    }, [formData]);
        

  return (
    <div className="form-page">
      <form className="form-container">
        <h2 className="phrase phrase">Nous serions ravis de recevoir vos demandes...</h2>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-input"
              value={formData.lastName} 
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email} 
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              value={formData.phone} 
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="adress">Adresse</label>
            <input
              type="text"
              id="adress"
              name="adress"
              className="form-input"
              value={formData.adress} 
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carRegistration">Matricule de la voiture</label>
            <input
              type="text"
              id="carRegistration"
              name="carRegistration"
              className="form-input"
              value={formData.carRegistration} 
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="carMake">Marque de la voiture</label>
            <input
              type="text"
              id="carMake"
              name="carMake"
              className="form-input"
              value={formData.carMake} 
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carModel">Modèle de la voiture</label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              className="form-input"
              value={formData.carModel} 
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Link to="/photos">
  <button type="button" disabled={!isFormComplete()}>
    Suivant
  </button>
</Link>

{showNotification && (
  <div className="notification">
    <p>Veuillez remplir tous les champs du formulaire.</p>
  </div>
)}

      </form>
    </div>
  );
};

export default FormPage;
