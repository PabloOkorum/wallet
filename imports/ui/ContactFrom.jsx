import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { ErrorAlert } from './component/Error.jsx';
import { SuccesAlert } from './component/SuccesAlert.jsx';
import { Alert, Button, Container, TextField } from '@mui/material';


export const ContactFrom = () => {
    // funciones
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imgenUrl, setImgenUrl] = useState('');
    const [walletId, setWalletId] = useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const showError = ({ message }) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 3000);
    };

    const saveSuccess = ({ message }) => {
        setSuccess(message);
        setEmail('');
        setName('');
        setImgenUrl('');
        setWalletId('');
        setTimeout(() => {
            setSuccess('');
        }, 3000);
    };

    const saveContact = () => {
        Meteor.call('contacts.insert', { name, email, imgenUrl, walletId },
            (errorResponse) => {
                if (errorResponse) {
                    showError({ message: errorResponse.error });
                } else {
                    saveSuccess({ message: 'Contact succes' });
                }
            });
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
        >
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success} </Alert>}
            <h1
                className="idWallet">
                Agregar Contacto
            </h1>
            <div>
                <TextField
                    sx={{ mr: 5 }}
                    label="Name"
                    variant="standard"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name} />

                <TextField
                    sx={{ mr: 5 }}
                    label="Email"
                    variant="standard"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email} />
            </div>
            <br />

            <div>
                <TextField
                    sx={{ mr: 5 }}
                    label="imgenUrl"
                    variant="standard"
                    id="imgenUrl"
                    onChange={(e) => setImgenUrl(e.target.value)}
                    type="text"
                    value={imgenUrl} />

                <TextField
                    sx={{ mr: 5 }}
                    label="Wallet Id"
                    variant="standard"
                    id="walletId"
                    onChange={(e) => setWalletId(e.target.value)}
                    type="text"
                    value={walletId} />
            </div>
            <br />

            <div>
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    ariant="contained"
                    type="button"
                    sx={{ mt: 1, mb: 5 }}
                    onClick={saveContact}
                >
                    Save contacts
                </Button>
            </div>

        </Container >
    );
};


