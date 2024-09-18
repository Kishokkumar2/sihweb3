import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import CoinContextProvider  from './Api/Coincontext';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CoinContextProvider>
      <App />
      </CoinContextProvider>
    
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
