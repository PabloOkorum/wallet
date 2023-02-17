import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ContactsCollection } from "./ContactsCollection";

Meteor.methods({

    'contacts.insert'({ name, email, imgenUrl }) {

        check(name, String);
        check(email, String);
        check(imgenUrl, String);

        if (!name) {
            throw new Meteor.Error("Name is requerit");
        }
        if (!email) {
            throw new Meteor.Error("email is requerit");
        }
        if (!imgenUrl) {
            throw new Meteor.Error("imgenUrl is requerit");
        }

        return ContactsCollection.insert({ name, email, imgenUrl, createdAt: new Date() });
    },

    'contacts.remove'({ contactId }) {
        console.log(contactId);
        ContactsCollection.remove({ _id: contactId });
    },

    'contacts.archive'({ contactId }) {
        console.log(contactId);
        ContactsCollection.update({ _id: contactId }, { $set: { archived: true } });
    }
})

