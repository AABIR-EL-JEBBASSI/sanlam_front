import React , { useState , useRef, useEffect } from 'react';
import './PhotosPage.css'; 
import { Link } from 'react-router-dom';

const PhotoPage = () => {

  const [capturedPhotos, setCapturedPhotos] = useState({});
  const [capturedMessage, setCapturedMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const [activeContainer, setActiveContainer] = useState(null); 
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const VideoContainerRef = useRef(null);
  const [activeCompteurContainer, setActiveCompteurContainer] = useState(null);
const [activeFaceAvantContainer, setActiveFaceAvantContainer] = useState(null);
const videoRefCompteur = useRef(null);
const videoRefFaceAvant = useRef(null);
const VideoContainerRefCompteur = useRef(null);
const VideoContainerRefFaceAvant = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (videoRef.current && VideoContainerRef.current) {
      startCamera(); // Vous pouvez maintenant accéder à videoRef.current en toute sécurité
    }
    return () => {
      stopCamera();
    };
  }, []);
  
  const startCameraCompteur = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
      if (videoRefCompteur.current) {
        videoRefCompteur.current.srcObject = stream;
        videoRefCompteur.current.play();
      }
  
      console.log(stream);
      streamRef.current = stream;
      setIsCameraActive(true);
  
      if (VideoContainerRefCompteur.current) {
        VideoContainerRefCompteur.current.appendChild(videoRefCompteur.current);
      }
    } catch (error) {
      console.error('Erreur lors de l\'accès à la caméra :', error);
    }
  };
  
  
  
  
  const stopCamera = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      window.URL.revokeObjectURL(video.src);
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };


  const capturePhoto = (imageName) => { 
    let currentVideoRef;

    if (activeCompteurContainer === 'Compteur') {
      currentVideoRef = videoRefCompteur.current;
    } else if (activeFaceAvantContainer === 'Face avant') {
      currentVideoRef = videoRefFaceAvant.current;
    } else {
      currentVideoRef = videoRef.current;
    }
    if (!currentVideoRef || !isCameraActive) {
      console.error('La caméra n\'est pas active.');
      return;
    }
  
    // Créez une fonction pour gérer l'événement play
    const handlePlay = () => {
      const canvasElement = document.createElement('canvas');
      const context = canvasElement.getContext('2d');
  
      canvasElement.width = currentVideoRef.videoWidth;
      canvasElement.height = currentVideoRef.videoHeight;
      context.drawImage(currentVideoRef.current, 0, 0, canvasElement.width, canvasElement.height);
  
      const imageDataURL = canvasElement.toDataURL('image/png');
  
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
  
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const photoInfo = {
          date: formattedDate,
          location: { latitude, longitude },
        };
  
        const updatedCapturedPhotos = { ...capturedPhotos };
        updatedCapturedPhotos[imageName] = { imageDataURL, ...photoInfo };
        setCapturedPhotos(updatedCapturedPhotos);
        setCapturedMessage('Photo sauvegardée');
  
        setSelectedPhoto({ imageDataURL, ...photoInfo });
        
        // Arrêtez la caméra après avoir capturé la photo
        stopCamera();
        
        // Supprimez l'écouteur d'événements après avoir capturé la photo
        videoRef.current.removeEventListener('play', handlePlay);
      });
    };
    
    // Ajoutez l'écouteur d'événements au videoRef.current
    videoRef.current.addEventListener('play', handlePlay);
  };

 
  
   
  useEffect(() => {
    if (selectedPhoto) {
      console.log('Photo capturée :', selectedPhoto);
    }
    setActiveContainer(null)
  }, [selectedPhoto]);

  const toggleCameraAndCaptureCompteur =  () => {
    if (!isCameraActive) {
      // Démarrer la caméra s'il n'est pas encore actif
       startCameraCompteur();
       setActiveCompteurContainer('Compteur'); 
       setActiveFaceAvantContainer(null); 
       
    } else {
      capturePhoto('Compteur');
      setActiveCompteurContainer(null); 
      stopCamera();
    }
  };
  const toggleCameraAndCaptureFaceAvant =  () => {
    if (!isCameraActive) {
      // Démarrer la caméra s'il n'est pas encore actif
       startCamera();
       setActiveFaceAvantContainer('Face avant'); 
       setActiveCompteurContainer(null); 
       
    } else {
      capturePhoto('Face avant');
      setActiveFaceAvantContainer(null); 
      stopCamera();
    }
  };
  return (

    <div className="photo-page">
      <h2>Capture des photos !</h2>
      <p>* : Photos obligatoires</p>
      <p>² : Photos facultatives, mais ne seront validées qu'une fois prises en recto et verso</p>



      
      <div className={`image-container container ${activeCompteurContainer === 'Compteur' ? 'active' : ''}`}>
        <div className="image-wrapper">
          <div className="text-part">
            <h2>Compteur*</h2>
            <p>Veuillez prendre une photo claire de votre compteur afin de documenter avec précision les informations relatives  au kilométrage de votre véhicule.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Compteur.jpg' alt="Compteur" />
          </div>
        </div>
        <button className="button-capture" onClick={ toggleCameraAndCaptureCompteur}>{isCameraActive ?'Capturer' : 'Démarrer la caméra'}</button>
        {capturedMessage && <p>{capturedMessage}</p>}

        {selectedPhoto && (
        <div className="captured-photo">
          <img src={selectedPhoto.imageDataURL} alt="Photo capturée" />
          <p>Date: {selectedPhoto.date}</p>
          <p>Latitude: {selectedPhoto.location.latitude}</p>
          <p>Longitude: {selectedPhoto.location.longitude}</p>
        </div>
      )}

        {selectedPhoto && (
          <button className="button-view-photo" onClick={() => setSelectedPhoto(null)}>Fermer la photo</button>
        )}
        {activeCompteurContainer === 'Compteur' && (
            <div className="camera-container" ref={VideoContainerRefCompteur}>
          <video ref={videoRefCompteur} autoPlay />
      </div>
      )}
      </div>
      


      <div className={`image-container container ${activeFaceAvantContainer === 'Face avant' ? 'active' : ''}`}>
        <div className="image-wrapper">
          <div className="text-part">
            <h2>Face avant*</h2>
            <p>Veuillez prendre une photo claire de la face avant de votre voiture afin de documenter avec précision son état.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Face avant.png' alt="Face avant" />
          </div>
        </div>
        <button className="button-capture" onClick={() => {toggleCameraAndCaptureFaceAvant(); setActiveFaceAvantContainer('Face avant'); }}>{isCameraActive ?'Capturer' : 'Démarrer la caméra'}</button>
        {capturedMessage && <p>{capturedMessage}</p>}  
            
        {selectedPhoto && (
        <div className="captured-photo">
          <img src={selectedPhoto.imageDataURL} alt="Photo capturée" />
          <p>Date: {selectedPhoto.date}</p>
          <p>Latitude: {selectedPhoto.location.latitude}</p>
          <p>Longitude: {selectedPhoto.location.longitude}</p>
        </div>
      )}

        {selectedPhoto && (
          <button className="button-view-photo" onClick={() => setSelectedPhoto(null)}>Fermer la photo</button>
        )}
             
        {activeContainer === 'Face avant' && (
            <div className="camera-container" ref={VideoContainerRef}>
          <video ref={videoRef} autoPlay />
      </div>
      )}
    
        </div>

      <div className="image-container">
        <div className="image-wrapper">
          <div className="text-part">
            <h2>Face arrière*</h2>
            <p>Veuillez prendre une photo claire de la face arrière de votre voiture afin de documenter avec précision son état.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Face arrière.png' alt="Face arrière" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera(); capturePhoto('Face arrière');}}>Capturer </button>
      </div>

      <div className="image-container">
        <div className="image-wrapper">
          <div className="text-part">
            <h2>Face latérale conducteur*</h2>
            <p>Veuillez prendre une photo claire de la face latérale conducteur de votre voiture afin de documenter avec précision son état.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Face conducteur.png' alt="Face conducteur" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera();capturePhoto('Face conducteur');}}>Capturer</button>
      </div> 

      <div className="image-container">
        <div className="image-wrapper">
          <div className="text-part">
            <h2>Face latérale passager*</h2>
            <p>Veuillez prendre une photo claire de la face latérale passager de votre voiture afin de documenter avec précision son état.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Face passager.png' alt="Face passager" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera();capturePhoto('Face passager');}}>Capturer</button>
      </div> 

      <div className="image-container">
        <div className="image-wrapper">
          <div className="text-part">
            <h2>CIN²</h2>
            <h3> Recto</h3>
            <p>Veuillez prendre une photo claire et nette du recto de votre carte d'identité nationale (CIN).</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\CIN recto2.jpg' alt="CIN recto" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera();capturePhoto('CIN recto');}}>Capturer</button>

        <div className="image-wrapper">
          <div className="text-part">
            <h3> Verso</h3>
            <p>De plus, veuillez prendre une photo du verso de votre carte d'identité nationale (CIN) de manière lisible et sans reflets.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\CIN verso.jpg' alt="CIN verso" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera();capturePhoto('CIN verso');}}>Capturer</button>
      </div> 
      

      <div className="image-container">
        <div className="image-wrapper">
          <div className="text-part">
            <h2>Permis de conduire²</h2>
            <h3> Recto</h3>
            <p>Veuillez prendre une photo claire et nette du recto de votre permis de conduire.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Permis recto2.png' alt="Permis recto" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera();capturePhoto('Permis recto');}}>Capturer</button>


        <div className="image-wrapper">
          <div className="text-part">
            <h3> Verso</h3>
            <p>De plus, veuillez prendre une photo du verso de votre permis de conduire de manière à ce que toutes les informations soient clairement visibles.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Permis verso.png' alt="Permis verso" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera();capturePhoto('Permis verso');}}>Capturer</button>
      </div>

      <div className="image-container">
        <div className="image-wrapper">
          <div className="text-part">
            <h2>Carte grise²</h2>
            <h3> Recto</h3>
            <p>Veuillez capturer une image nette du recto de votre carte grise.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Carte grise recto2.png' alt="Carte grise recto" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera();capturePhoto('Carte grise recto');}}>Capturer</button>

        <div className="image-wrapper">
          <div className="text-part">
            <h3> Verso</h3>
            <p>De plus, veuillez prendre une photo du verso de votre carte grise de manière à ce que toutes les informations soient clairement visibles.</p>
          </div>
          <div className="image-part">
            <img src='src\components\PhotosPage\Carte grise verso.png' alt="Carte grise verso" />
          </div>
        </div>
        <button className="button-capture" onClick={() => { startCamera();capturePhoto('Carte grise verso');}}>Capturer</button>
      </div>

      {/* Boutons suivant et précédent */}
      <div >
        <Link to="/form">
          <button className="button-prev-next" type='button'>Précédent</button>
        </Link>
        <Link to="/signature">
        <button className="button-prev-next" type='button'>Suivant</button>
        </Link>
      </div>
    </div>
  );
};

export default PhotoPage;
