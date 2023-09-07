import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

// Utilisez ReactDOM.render au lieu de ReactDOM.createRoot
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
