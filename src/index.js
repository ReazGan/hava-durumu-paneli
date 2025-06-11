import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js'; // app.js dosyamızı import ediyoruz

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);