// src/FormDataContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';

const FormDataContext = createContext();

export function useFormData() {
  return useContext(FormDataContext);
}

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', 
    phone: '',
    adress: '',
    carRegistration: '',
    carMake: '',
    carModel: '',
  });
  const memoizedValue = useMemo(() => ({ formData, setFormData }), [formData, setFormData]);
  return (
    <FormDataContext.Provider value={memoizedValue}>
      {children}
    </FormDataContext.Provider>
  );
}
