import React, { memo } from 'react';
import { ContactsCollection } from '../api/collections/ContactsCollection';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { Loading } from './component/Loading.jsx';
import { Meteor } from 'meteor/meteor';
import { Avatar, Box, Button, ButtonGroup, Container, List, ListItemAvatar, ListItemText } from '@mui/material';




export const ContactList = () => {
    const isLoading = useSubscribe('myContacts');
    const contacts = useFind(() =>
        ContactsCollection.find(
            {},
            { sort: { CreatedAt: -1 } }
        )
    );


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


    if (isLoading()) {
        return <Loading />;
    }

    const ContactItem = memo(({ contact }) => (

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>{contact.imageUrl && (
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={contact.imageUrl} />
            </ListItemAvatar>

        )}
            <Box sx={{ p: 2, border: '1px dashed grey' }}>


                <ListItemText
                    primary={contact.name}
                    secondary={
                        <React.Fragment>
                            {contact.email} - {contact.walletId}
                        </React.Fragment>
                    }
                />

                <ButtonGroup
                    variant="text"
                    aria-label="text button group"
                >

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
                </ButtonGroup>
            </Box>

        </List>
    ));

    // retorno forma como se vera
    return (
        <Container
            component="main"
            maxWidth="sm"
        >

            <h2>Contact List</h2>

            {contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
            ))}

        </Container>
    );
};
