import React from 'react';
import { ContactFrom } from './ContactFrom';
import { ContactList } from './ContactList';

//contacto: nombre, email, imgenUrl
export const App = () => (
  <div>
    <h1>Welcome to wallet!</h1> 
    <ContactFrom/>
    <ContactList/>
  </div>
);
