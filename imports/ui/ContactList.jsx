import React, { memo } from 'react';
import { ContactsCollection } from '../api/ContactsCollection';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';

export const ContactList = () => {

    const isLoading = useSubscribe('contacts');
    const contacts = useFind(() => ContactsCollection.find({}, { sort: { CreatedAt: -1 } })) // Tracker 
    //const [archivados, setArvhivados] = useState(true);
    //const contacts = useTracker(() => {
    //   return ContactsCollection.find({}, { sort: { CreatedAt: -1 } }).fetch(); // Tracker
    // });

    const removeContact = (event, _id) => {
        event.preventDefault();
        Meteor.call('contacts.remove', { contactId: _id });
        // , (error, result ) => console.log(error , result) 
    }

   // const mostrarArchivados = () => { setArvhivados(false); }



    const archiveContact = (event, _id) => {
        event.preventDefault();
        Meteor.call('contacts.archive', { contactId: _id });
        // , (error, result ) => console.log(error , result) 
    }


    if (isLoading()) {
        return <p>Loading...</p>
    }

    const ContactItem = memo(({ contact }) => {
        return (

            <li > {contact.name} - {contact.email} -

                <a
                    href='#'
                    onClick={(event) => removeContact(event, contact._id)}
                >
                    remove
                </a>
                - -
                <a
                    href='#'
                    onClick={(event) => archiveContact(event, contact._id)}
                >
                    archive
                </a>
                -
            </li>
        )
    });

    //retorno forma como se vera
    return (
        <>

            <h3>Contact List</h3>
            {contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
            ))}
        </>
    )
}
