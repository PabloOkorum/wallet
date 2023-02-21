import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

export const ContactsCollection = new Mongo.Collection('contacts');

const ContactsShema = new SimpleSchema({

    name: {
        type: String
    },
    email: {
        type: String,
    },
    imageURL: {

        type: String,
        optional: true,

    },
    walletId: {
        type: String,
        //regExp: SimpleSchema.RegEx.Id,
    },
    createdAt: {

        type: Date,

    },
    archived: {
        type: Boolean,
        defaultValue: false,
    },
});

ContactsCollection.attachSchema(ContactsShema);
