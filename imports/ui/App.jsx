import React from 'react';
import { ContactFrom } from './ContactFrom';
import { ContactList } from './ContactList';
import { Headerss } from './component/Header';
import { Wallet } from './Wallet';

//contacto: nombre, email, imgenUrl
export const App = () => (
  <div>
    <Headerss/>
    <Wallet/>
    <ContactFrom/>
    <ContactList/>
  </div>
);
