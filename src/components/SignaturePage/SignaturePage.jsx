import React, { useRef, useState, useEffect  } from 'react';
import './SignaturePage.css';
import { Link, useNavigate } from 'react-router-dom';

const SignaturePage = ({ formData, setFormData, setSignature }) => {
  const signatureBoxRef = useRef(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);



  const startDrawing = (e) => {
    const ctx = signatureBoxRef.current.getContext('2d');
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.beginPath();
    setIsSigning(true);
  };

  const draw = (e) => {
    if (!isSigning) return;
    const ctx = signatureBoxRef.current.getContext('2d');
    const x = e.clientX - signatureBoxRef.current.getBoundingClientRect().left;
    const y = e.clientY - signatureBoxRef.current.getBoundingClientRect().top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsSigning(false);
  };

  const clearSignature = () => {
    const ctx = signatureBoxRef.current.getContext('2d');
    ctx.clearRect(0, 0, signatureBoxRef.current.width, signatureBoxRef.current.height);
  };

  const saveSignature = () => {
    const signatureImageURL = signatureBoxRef.current.toDataURL();
    setSignatureImage(signatureImageURL);
    setSignature(signatureImageURL);
    console.log('Signature sauvegardée:', signatureImageURL);
    localStorage.setItem('signatureData', JSON.stringify({ signatureImageURL, name, date }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      signature: signatureImageURL,
      name,
      date,
    }));
    setSignatureSaved(true); // Display the "Signature enregistrée" message
  };
  const showNotificationModal = () => {
    setShowNotification(true);
  };
  
  

  return (
    <div className="signature-page">
      <h2 className="signature-title">Signature numérique</h2>
      <p className="signature-description">
        Vous êtes sur le point d'apposer votre signature électronique sur ce document. Cette action possède une validité légale équivalente à celle d'une signature manuscrite sur papier.
      </p>

      <div className="form-group">
        <label>Nom et Prénom du signataire</label>
        <input type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Date de signature</label>
        <input type="text"
         value={date}
         onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="signature-container">
        <canvas
          className="signature-box"
          id="signatureBox"
          ref={signatureBoxRef}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
        ></canvas>
        <p>Veillez signer ci-dessus</p>
        {signatureSaved && (
          <p style={{ color: 'green' }}>Signature enregistrée</p>
        )}
        <div className="signature-buttons">
          <button onClick={clearSignature}>Effacer</button>
          <button onClick={saveSignature}>Signer le document</button>
        </div>
      </div>

      <div className="checkbox">
        <input type="checkbox" id="confirmCheckbox"   checked={checkboxChecked}
        onChange={() => setCheckboxChecked(!checkboxChecked)}/>
        <label htmlFor="confirmCheckbox">
          En cochant cette case, je confirme que ma signature électronique ci-dessus est authentique et a la même valeur légale qu'une signature manuscrite.
        </label>
      </div>
      {showNotification && (
  <div className="notification-modal">
    <p>Veuillez cocher la case pour confirmer.</p>
    <button onClick={() => setShowNotification(false)}>OK</button>
  </div>
)}

      <div className="navigation-buttons">
        <Link to="/photos2">
          <button>Précédent</button>
        </Link>
        
        
        <Link
  to="/recap"
  state={{ formData }}
  className={`button-next ${!checkboxChecked ? 'disabled' : ''}`}
  onClick={(e) => {
    if (!checkboxChecked) {
      e.preventDefault();
      const userConfirmed = window.confirm(
        'Veuillez cocher la case pour confirmer. Cliquez sur "OK" pour continuer ou "Annuler" pour rester sur cette page.'
      );
      if (!userConfirmed) {
        e.stopPropagation(); // Prevent navigation if the user cancels
      }
    }
  }}
>
  <button onClick={showNotificationModal}>Suivant</button>
</Link>



      </div>
    </div>
  );
};

export default SignaturePage;
