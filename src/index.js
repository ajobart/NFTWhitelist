import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// On importe le fichier admin que l'on va créer
import Admin from './components/Admin';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* On défini la route initial qui sera App*/}
        <Route path="/" element={<App />} />
        {/* On défini la route admin qui sera Admin*/}
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
