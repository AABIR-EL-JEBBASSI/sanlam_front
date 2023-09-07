// src/FormDataContext.js
import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export function FormDataProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    carRegistration: '',
    carMake: '',
    carModel: '',
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
}

export function useFormData() {
  return useContext(FormDataContext);
}
