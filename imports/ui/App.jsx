import React from 'react';
import { ContactFrom } from './ContactFrom';
import { ContactList } from './ContactList';
import { Headerss } from './component/Header';

//contacto: nombre, email, imgenUrl
export const App = () => (
  <div>
    <Headerss/>
    <ContactFrom/>
    <ContactList/>
  </div>
);
