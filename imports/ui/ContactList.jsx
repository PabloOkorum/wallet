import React, { useState, useEffect } from 'react';
import { ContactsCollection } from '../api/collections/ContactsCollection';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { Loading } from './component/Loading.jsx';
import { Meteor } from 'meteor/meteor';
import { Alert, Avatar, Box, Button, ButtonGroup, Container, List, ListItemAvatar, ListItemText, TextField } from '@mui/material';


export const ContactList = () => {
    const isLoading = useSubscribe('myContacts');
    const contacts = useFind(() =>
        ContactsCollection.find(
            {},
            { sort: { CreatedAt: -1 } }
        ),
        []
    );

    // Update
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [idContactUpdate, setIdContactUpdate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [walletId, setWalletId] = useState('');

   // useEffect(), useFind, useState

    const showError = ({ message }) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 5000);
    };
    const saveSuccess = ({ message }) => {
        setSuccess(message);
        setTimeout(() => {
            setSuccess('');
        }, 5000);
    };

    const saveUpdateContact = (event, _id) => {
        event.preventDefault();
        Meteor.call('contacts.update', {
            contactId: _id,
            contactName: name,
            contactEmail: email,
            contactWalletId: walletId,
            accion: 'update',
        },
            (errorResponse) => {
                if (errorResponse) {
                    showError({ message: errorResponse.error });
                } else {
                    saveSuccess({ message: 'Contact update' });
                    setIsUpdate(false);
                    setIdContactUpdate('');
                    setEmail('');
                    setName('');
                    setWalletId('');
                }
            });
    };

    const updateContact = (event, contact) => {
        const { _id: id, name: nameChange, email: emailChange, walletId: walletIdChange } = contact;

        event.preventDefault();
        setIsUpdate(true);
        setEmail(emailChange);
        setName(nameChange);
        setWalletId(walletIdChange);
        setIdContactUpdate(id);
    };

    //


    const removeContact = (event, _id) => {
        event.preventDefault();
        Meteor.call('contacts.remove', { contactId: _id });
        // , (error, result ) => console.log(error , result)
    };

    // const mostrarArchivados = () => { setArvhivados(false); }


    const archiveContact = (event, _id) => {
        event.preventDefault();
        Meteor.call('contacts.archive', { contactId: _id });
        // , (error, result ) => console.log(error , result)
    };

    const prueba = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        console.log(name);
        setName(e.target.value);
        console.log(name);

    };

    if (isLoading()) {
        return <Loading />;
    }

    const ContactItem = ({ contact }) => (

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>{contact.imageUrl && (
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={contact.imageUrl} />
            </ListItemAvatar>

        )}
            <Box
                sx={{
                    p: 2,
                    border: '1px dashed grey',
                }}
            >

                {!isUpdate && (
                    <ListItemText
                        primary={contact.name}
                        secondary={
                            <>
                                {contact.email} - {contact.walletId}
                            </>
                        }
                    />

                )}

                {idContactUpdate == contact._id && (
                    <>
                        <TextField
                            sx={{ mr: 10 }}
                            label="Name"
                            variant="standard"
                            id="name"
                            onChange={prueba}
                            type="text"
                            value={name} />

                        <TextField
                            sx={{ mr: 10 }}
                            label="Email"
                            variant="standard"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            value={email} />

                        <TextField
                            sx={{ mr: 10 }}
                            label="walletId"
                            variant="standard"
                            id="walletId"
                            onChange={(e) => setWalletId(e.target.value)}
                            type="text"
                            value={walletId} />
                    </>
                )}

                <ButtonGroup
                    variant="text"
                    aria-label="text button group"
                >
                    {!isUpdate && (
                        <>
                            <Button
                                color="error"
                                href="#"
                                onClick={(event) => removeContact(event, contact._id)}
                            >
                                remove
                            </Button>
                            <br />
                            <Button
                                color="success"
                                href="#"
                                onClick={(event) => archiveContact(event, contact._id)}
                            >
                                archive
                            </Button>
                        </>
                    )}
                    <br />
                    {!isUpdate && (
                        <Button
                            color="success"
                            href="#"
                            onClick={(event) => updateContact(event, contact)}
                        >
                            update
                        </Button>
                    )}

                    {isUpdate && idContactUpdate == contact._id && (
                        <Button
                            color="success"
                            href="#"
                            onClick={(event) => saveUpdateContact(event, contact._id)}
                        >
                            save
                        </Button>
                    )}
                </ButtonGroup>
            </Box>

        </List >
    );

    // retorno forma como se vera
    return (

        <Container
            component="main"
            maxWidth="sm"
        >

            <h2>Contact List</h2>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success} </Alert>}

            {contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
            ))}

        </Container>
    );
};
