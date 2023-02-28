import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button, Grid, TextField } from '@mui/material';


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
        Meteor.call('contacts.insert', { name, email, imgenUrl, walletId, accion: 'crearContacto' },
            (errorResponse) => {
                if (errorResponse) {
                    showError({ message: errorResponse.error });
                } else {
                    saveSuccess({ message: 'Contact succes' });
                }
            });
    };

    return (
        <Grid
            container
            component="main"
            maxWidth="l"
        >

            <Grid
                item
                xs={12}
                container
                justifyContent="center"
            >
                <h1
                    className="idWallet">
                    Agregar Contacto
                </h1>
            </Grid>

            <Grid
                item
                xs={12}
                container
                justifyContent="center"
            >
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success} </Alert>}
            </Grid>

            <Grid
                item
                xs={14}
                container
                justifyContent="center"
            >
                <TextField
                    sx={{ mr: 10 }}
                    label="Name"
                    variant="standard"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name} />

                <TextField
                    sx={{ mr: 0 }}
                    label="Email"
                    variant="standard"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email} />

            </Grid>

            <br />

            <Grid
                item
                xs={14}
                container
                justifyContent="center"
            >
                <TextField
                    sx={{ mr: 10 }}
                    label="imgenUrl"
                    variant="standard"
                    id="imgenUrl"
                    onChange={(e) => setImgenUrl(e.target.value)}
                    type="text"
                    value={imgenUrl} />

                <TextField
                    sx={{ mr: 0 }}
                    label="Wallet Id"
                    variant="standard"
                    id="walletId"
                    onChange={(e) => setWalletId(e.target.value)}
                    type="text"
                    value={walletId} />
            </Grid>
            <br />

            <Grid
                item
                xs={12}
                container
                justifyContent="center"
            >
                <Button
                    display="flex"
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
            </Grid>

        </Grid >
    );
};
