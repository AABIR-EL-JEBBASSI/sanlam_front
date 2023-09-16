// PhotoContext.js
import React, { createContext, useContext, useState } from 'react';

const PhotoContext = createContext();

export const usePhotoContext = () => {
  return useContext(PhotoContext);
};

export const PhotoProvider = ({ children }) => {
  const [capturedPhotos, setCapturedPhotos] = useState({});

  const addCapturedPhoto = (photoName, photoData) => {
    setCapturedPhotos((prevPhotos) => ({
      ...prevPhotos,
      [photoName]: photoData,
    }));
  };

  return (
    <PhotoContext.Provider value={{ capturedPhotos, addCapturedPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};
