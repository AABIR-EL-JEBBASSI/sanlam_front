
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Utilisez Routes au lieu de Switch
import HomePage from './components/Home/HomePage';
import FormPage from './components/FormPage/FormPage';
import PhotosPage from './components/PhotosPage/PhotosPage';
import PhotoPage2 from './components/PhotosPage/PhotoPage2';
import SignaturePage from './components/SignaturePage/SignaturePage';
import RecapPage from './components/RecapPage/RecapPage';
import LoginPage from './components/LoginPage/LoginPage';
import ClientListPage from './components/ClientListPage/ClientListPage';
import AdminDashBoard from './components/AdminDashBoard/AdminDashBoard';
import NewDemands from './components/NewDemands/NewDemands';
import { FormDataProvider } from './components/FormPage/FormDataContext';

function App() {
  const [formData, setFormData] = useState({});
  const [signature, setSignature] = useState(null); 
  return (
    <Router>
      <FormDataProvider>
      <Routes> {/* Utilisez Routes pour définir vos itinéraires */}
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage formData={formData} setFormData={setFormData} />} />
        <Route path="/photos" element={<PhotosPage formData={formData} setFormData={setFormData} />} />
        <Route path="/photos2" element={<PhotoPage2 formData={formData} setFormData={setFormData} />} />
        <Route path="/signature" element={<SignaturePage formData={formData} setFormData={setFormData} setSignature={setSignature}/>}/>
        <Route path="/recap" element={<RecapPage formData={formData} signature={signature} />}/>
        <Route path="/login" element={<LoginPage formData={formData} />}/>
        <Route path="/clientListPage" element={<ClientListPage formData={formData} />}/>
        <Route path="/adminDashBoard" element={<AdminDashBoard formData={formData} />}/>
        <Route path="/newDemands" element={<NewDemands formData={formData} />}/>
      </Routes>
      </FormDataProvider>
    </Router> 
  );
}

export default App;
