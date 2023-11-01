import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
// import TPState from './context/tp/TPState';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <TPState> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </TPState> */}
    {/* <UserState>
    </UserState> */}
  </React.StrictMode>
);
