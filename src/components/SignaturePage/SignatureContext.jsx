import React, { createContext, useContext, useState } from 'react';

// Créez le contexte ici
const SignatureContext = createContext();

export const SignatureProvider = ({ children }) => {
  const [signatureData, setSignatureData] = useState({
    signatureImageURL: '',
    name: '',
    date: '',
  });

  return (
    <SignatureContext.Provider value={{ signatureData, setSignatureData }}>
      {children}
    </SignatureContext.Provider>
  );
};

export const useSignature = () => {
  const context = useContext(SignatureContext);
  if (!context) {
    throw new Error('useSignature must be used within a SignatureProvider');
  }
  return context;
};
