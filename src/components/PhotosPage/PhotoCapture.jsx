import React, { useState, useRef, useEffect } from 'react';
import { usePhotoContext } from './PhotoContext';

const PhotoCapture = ({ containerName, onPhotoCapture, text, photoName, imageUrl , isActive }) => {
  const [capturedMessage, setCapturedMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoContainer = useRef(null);
  const videoRef = useRef(null);
  const { addCapturedPhoto } = usePhotoContext(); 

  const streamRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState({
    imageDataURL: null,
    date: null,
    location: {
      latitude: null,
      longitude: null,
    },
  });

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
        streamRef.current = stream;
        if (videoContainer.current) {
          videoContainer.current.appendChild(videoRef.current);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'accès à la caméra :', error);
      });
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const capturePhoto = (imageName) => {
    if (!isCameraActive) {
      console.error('La caméra n\'est pas active.');
      return;
    }

    const canvasElement = document.createElement('canvas');
    const context = canvasElement.getContext('2d');
    canvasElement.width = videoRef.current.videoWidth;
    canvasElement.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasElement.width, canvasElement.height);

    const imageData = canvasElement.toDataURL('image/png');

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const photoInfo = {
          date: formattedDate,
          location: { latitude, longitude },
        };
  
        setSelectedPhoto({
          imageData,
          date: formattedDate,
          location: { latitude, longitude },
        });
  
        // Call addCapturedPhoto from the context to save the photo data
        addCapturedPhoto(imageName, {
          imageData,
          date: formattedDate,
          location: { latitude, longitude },
        });
  
        // Log the saved photo data to the console
        console.log('Saved photo data:', imageName, {
          imageData,
          date: formattedDate,
          location: { latitude, longitude },
        });
  
        setCapturedMessage('Photo sauvegardée');
      });
    } catch (error) {
      console.error('Error getting geolocation:', error);
    }
  };

  
  

  const toggleCameraAndCapture = () => {
    if (!isCameraActive) {
      // Démarrer la caméra s'il n'est pas encore actif
      startCamera();
    } else {
      // Capturer une photo
      capturePhoto(containerName);
    }
  
  };
  

  return (
    <div className="image-container container" ref={videoContainer}>
    <div className="ti">
    <div className="text-part">
      <h2>{containerName}*</h2>
      <p>{text}</p>
    </div>
    <div className="image-part">
      <img src={imageUrl} alt={containerName} />
  </div>
  </div>
      {selectedPhoto.imageData && (
        <div className="captured-photo">
          <img src={selectedPhoto.imageData} alt="Photo capturée" />
          <p>Date: {selectedPhoto.date}</p>
          <p>Latitude: {selectedPhoto.location.latitude}</p>
          <p>Longitude: {selectedPhoto.location.longitude}</p>
        </div>
      )}
      <button className="button-capture" onClick={toggleCameraAndCapture}>
        {isCameraActive ? 'Capturer' : 'Démarrer la caméra'}
      </button>
      {capturedMessage && <p>{capturedMessage}</p>}
      <div className="camera-container">
        <video ref={videoRef} autoPlay />
      </div>
    </div>
  );
};

export default PhotoCapture;

