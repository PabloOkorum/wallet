import React, { memo } from 'react';
import { ContactsCollection } from '../api/collections/ContactsCollection';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { Loading } from './component/Loading.jsx';
import { Meteor } from 'meteor/meteor';


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

            <li > {contact.imageUrl && (<div><img src={contact.imageUrl} /></div>)}
                {contact.name} - {contact.email} - {contact.walletId} -

                <a
                    href="#"
                    onClick={(event) => removeContact(event, contact._id)}
                >
                    remove
                </a>
                - -
                <a
                    href="#"
                    onClick={(event) => archiveContact(event, contact._id)}
                >
                    archive
                </a>
                -
            </li>
        ));

    // retorno forma como se vera
    return (
        <>

            <h3>Contact List</h3>
            {contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
            ))}
        </>
    );
};
