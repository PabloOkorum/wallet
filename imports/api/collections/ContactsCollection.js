import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ContactsCollection = new Mongo.Collection('contacts');

const ContactsShema = new SimpleSchema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    imgenUrl: {

        type: String,
        optional: true,

    },
    walletId: {
        type: String,
        // regExp: SimpleSchema.RegEx.Id,
    },
    createdAt: {

        type: Date,

    },
    userId: {

        type: String,

    },
    archived: {
        type: Boolean,
        defaultValue: false,
    },

    logs: {
        type: Array,
        optional: true,
    },
    'logs.$': {
        type: Object,
    },
    'logs.$.userUpdate': {
        type: String,
    },
    'logs.$.modificAt': {
        type: Date,
    },
    'logs.$.accionUpdate': {
        type: String,
    },

});

ContactsCollection.attachSchema(ContactsShema);

// userUpdate: {
//     type: String,
//     optional: true,
// },
// modificAt: {
//     type: Date,
//     optional: true,
// },
// userId: {
//     type: String,
//     optional: true,
// },
// accionUpdate: {
//     type: String,
//     optional: true,
//     defaultValue: 'crear',
// },
