import React , { useState } from 'react';
import './PhotosPage.css';
import { Link } from 'react-router-dom';
import PhotoCapture from './PhotoCapture';

const PhotoPage2 = () => {
    const [capturedPhotos, setCapturedPhotos] = useState({});
  

    const handlePhotoCapture = (imageName, photoData) => {
        // Mettez à jour l'état avec la photo capturée
        const updatedCapturedPhotos = { ...capturedPhotos };
        updatedCapturedPhotos[imageName] = photoData;
        setCapturedPhotos(updatedCapturedPhotos);
      };
  return (
    <div className="photo-page">
      <h2>Capture des photos !</h2>
      <p>* : Photos obligatoires</p>
      <p>² : Photos facultatives, mais ne seront validées qu'une fois prises en recto et verso</p>

      <PhotoCapture
  containerName="Compteur"
  onPhotoCapture={handlePhotoCapture}
  text="Veuillez prendre une photo claire de votre compteur afin de documenter avec précision les informations relatives au kilométrage de votre véhicule."
  photoName="Compteur"
  imageUrl="src/components/PhotosPage/Compteur.jpg"
  // Passer la fonction ici
/>

<PhotoCapture
  containerName="Face avant"
  text="Texte spécifique pour la face avant"
  photoName="photo2"
  imageUrl="src/components/PhotosPage/Face Avant.png"
  onPhotoCapture={handlePhotoCapture}
// Passer la fonction ici
/>


      {/* Ajoutez d'autres conteneurs de photo si nécessaire */}
    



<Link to="/form">
  <button className="button-prev-next" type='button'>Précédent</button>
</Link>
<Link to="/signature">
<button className="button-prev-next" type='button'>Suivant</button>
</Link>
</div>

  );
};

export default PhotoPage2;
