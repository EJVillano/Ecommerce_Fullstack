

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';



import 'bootstrap/dist/css/bootstrap.min.css';

console.log("API URL:", process.env.REACT_APP_API_URL);


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
