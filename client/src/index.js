import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { EthereumProvider } from './context/EthereumContext'
 
ReactDOM.render(
  <React.StrictMode>
    <EthereumProvider>
      <App />
    </EthereumProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
