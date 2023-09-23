import React, { useState , useEffect} from 'react';
import './PhotosPage.css';
import { Link } from 'react-router-dom';
import PhotoCapture from './PhotoCapture';

const PhotoPage2 = () => {
    const [capturedPhotos, setCapturedPhotos] = useState({});
    const [canProceed, setCanProceed] = useState(false);
  
    useEffect(() => {
        const isCinRectoCaptured = capturedPhotos['Cin recto'];
        const isPermisRectoCaptured = capturedPhotos['Permis recto'];
        const isCarteGriseRectoCaptured = capturedPhotos['Carte grise recto'];
    
        const isCinVersoCaptured = capturedPhotos['Cin verso'];
        const isPermisVersoCaptured = capturedPhotos['Permis verso'];
        const isCarteGriseVersoCaptured = capturedPhotos['Carte grise verso'];
    
        // Vérifiez si Cin recto est capturée, alors Cin verso doit aussi être capturée
        // De même pour Permis recto et Permis verso, Carte grise recto et Carte grise verso
        const isOptionalPhotosCaptured =
          (!isCinRectoCaptured || isCinVersoCaptured) &&
          (!isPermisRectoCaptured || isPermisVersoCaptured) &&
          (!isCarteGriseRectoCaptured || isCarteGriseVersoCaptured);
    
        // Vérifiez si les 5 photos obligatoires sont capturées et les photos facultatives avec contraintes sont prises
        const canProceedToSignature = Object.keys(capturedPhotos).length >= 5 && isOptionalPhotosCaptured;
    
        setCanProceed(canProceedToSignature);
      }, [capturedPhotos]);
    
      const handlePhotoCapture = (imageName, photoData) => {
        // Mettez à jour l'état avec la photo capturée
        const updatedCapturedPhotos = { ...capturedPhotos };
        updatedCapturedPhotos[imageName] = photoData;
        setCapturedPhotos(updatedCapturedPhotos);
        const areAllRequiredPhotosCaptured =
        'Compteur' in updatedCapturedPhotos &&
        'Face avant' in updatedCapturedPhotos &&
        'Face arriere' in updatedCapturedPhotos &&
        'Face latérale conducteur' in updatedCapturedPhotos &&
        'Face latérale passager' in updatedCapturedPhotos;

    // Mettez à jour l'état du bouton en conséquence
    setIsButtonEnabled(areAllRequiredPhotosCaptured);
      };

    return (
        <div className="photo-page">
            <h2>Capture des photos !</h2>
            <p>* : Photos obligatoires</p>
            <p>² : Photos facultatives, mais ne seront validées qu'une fois prises en recto et verso</p>
            <div className="photo-container">
            <PhotoCapture
                containerName="Compteur*"
                onPhotoCapture={handlePhotoCapture}
                text="Veuillez prendre une photo claire de votre compteur afin de documenter avec précision les informations relatives au kilométrage de votre véhicule."
                photoName="Compteur"
                imageUrl="src/components/PhotosPage/Compteur.jpg"
                
            />
            </div>
            <div className="photo-container">
            <PhotoCapture
                containerName="Face avant*"
                text="Veuillez prendre une photo claire de la face avant de votre voiture afin de documenter avec précision son état."
                photoName="Face avant"
                imageUrl="src/components/PhotosPage/Face Avant.png"
                onPhotoCapture={handlePhotoCapture}
                // Passer la fonction ici
            />
            </div>
            <div className="photo-container">
             <PhotoCapture
                containerName="Face arriere*"
                text="Veuillez prendre une photo claire de la face arrière de votre voiture afin de documenter avec précision son état."
                photoName="Face arriere"
                imageUrl="src/components/PhotosPage/Face arrière.png"
                onPhotoCapture={handlePhotoCapture}
                // Passer la fonction ici
            />
            </div>
<div className="photo-container">
<PhotoCapture
                containerName="Face latérale conducteur*"
                text="Veuillez prendre une photo claire de la face latérale conducteur de votre voiture afin de documenter avec précision son état."
                photoName="Face latérale conducteur"
                imageUrl="src/components/PhotosPage/Face conducteur.png"
                onPhotoCapture={handlePhotoCapture}
                // Passer la fonction ici
            />
            </div>
<div className="photo-container">
<PhotoCapture
                containerName="Face latérale passager*"
                text="Veuillez prendre une photo claire de la face latérale passager de votre voiture afin de documenter avec précision son état."
                photoName="Face latérale passager"
                imageUrl="src/components/PhotosPage/Face passager.png"
                onPhotoCapture={handlePhotoCapture}
                // Passer la fonction ici
            />
            </div>
<div className="photo-container">
<PhotoCapture
                containerName="CIN recto²"
                text="Veuillez prendre une photo claire et nette du recto de votre carte d'identité nationale (CIN)."
                photoName="Cin recto"
                imageUrl="src/components/PhotosPage/CIN recto2.jpg"
                onPhotoCapture={handlePhotoCapture}
                
            />
            </div>
            <div className="photo-container">
            <PhotoCapture
                containerName="CIN verso²"
                text="De plus, veuillez prendre une photo du verso de votre carte d'identité nationale (CIN) de manière lisible et sans reflets."
                photoName="Cin verso"
                imageUrl="src/components/PhotosPage/CIN verso.jpg"
                onPhotoCapture={handlePhotoCapture}
                
            /> 
            </div>
            <div className="photo-container">
              <PhotoCapture
                containerName="Permis de conduire recto²"
                text="Veuillez prendre une photo claire et nette du recto de votre permis de conduire."
                photoName="Permis recto"
                imageUrl="src/components/PhotosPage/Permis recto2.png"
                onPhotoCapture={handlePhotoCapture}
                
            /> 
            </div>
            <div className="photo-container">
               <PhotoCapture
                containerName="Permis de conduire verso²"
                text="De plus, veuillez prendre une photo du verso de votre permis de conduire de manière à ce que toutes les informations soient clairement visibles."
                photoName="Permis verso"
                imageUrl="src/components/PhotosPage/Permis verso.png"
                onPhotoCapture={handlePhotoCapture}
                
            /> 
            </div>
            <div className="photo-container">
                  <PhotoCapture
                containerName="Carte grise recto²"
                text="Veuillez capturer une image nette du recto de votre carte grise de manière à ce que toutes les informations soient clairement visibles."
                photoName="Carte grise recto"
                imageUrl="src/components/PhotosPage/Carte grise recto2.png"
                onPhotoCapture={handlePhotoCapture}
                
            /> 
            </div>
            <div className="photo-container">
                  <PhotoCapture
                containerName="Carte grise verso²"
                text="De plus, Veuillez capturer une image nette du verso de votre carte grise. de manière à ce que toutes les informations soient clairement visibles."
                photoName="Carte grise verso"
                imageUrl="src/components/PhotosPage/Carte grise verso.png"
                onPhotoCapture={handlePhotoCapture}
                
            /> 
            </div>

            

            <Link to="/form">
                <button className="button-prev-next" type='button'>Précédent</button>
            </Link>
            <Link to="/signature">
                <button className="button-prev-next" type='button' >Suivant</button>
            </Link>
        </div>
    );
};

export default PhotoPage2;
