import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Headerss } from './component/Header.jsx';
import { Router } from './Router.jsx';


// contacto: nombre, email, imgenUrl
export const App = () => (
  <BrowserRouter>
    <div>
      <Headerss />
      <div>
        <Router />
      </div>
    </div>
  </BrowserRouter>
);
