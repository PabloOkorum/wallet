import React from 'react';
import { ContactsCollection } from '../api/ContactsCollection';
import { useTracker } from 'meteor/react-meteor-data';

export const ContactList = () => {
    //variables
    const contacts = useTracker(() => {
        return ContactsCollection.find({}, { sort: { CreatedAt: -1 } }).fetch(); // Tracker
    });

    const removeContact = (event, _id) => {
        event.preventDefault();
        Meteor.call('contacts.remove', { contactId: _id }); 
        // , (error, result ) => console.log(error , result) 

    }

    //retorno forma como se vera
    return (
        <>
            <h3>Contact List</h3>
            {contacts.map(contact => (

                <li key={contact.email}> {contact.name} - {contact.email} -

                    <a
                        href='#'
                        onClick={(event) => removeContact(event, contact._id)}
                    >
                        remove
                    </a>

                </li>

            ))}
        </>
    )
}
