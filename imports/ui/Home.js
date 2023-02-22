import React from 'react';
import { Wallet } from './Wallet.jsx';
import { ContactFrom } from './ContactFrom.jsx';
import { ContactList } from './ContactList.jsx';


export const Home = () => (
    <>
        <Wallet />
        <ContactFrom />
        <ContactList />
    </>
);
