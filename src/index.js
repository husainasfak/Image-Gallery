import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppConfigProvider} from './context/appConfigContext';
import { FetchImgProvider } from './context/fetchImgContext';
import {SearchImgProvider} from './context/searchImgContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppConfigProvider>
    <FetchImgProvider>
      <SearchImgProvider><App /></SearchImgProvider>
    
    </FetchImgProvider>
     
    </AppConfigProvider>
  </React.StrictMode>
);


reportWebVitals();
