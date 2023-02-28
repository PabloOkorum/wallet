import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ContactsCollection } from '../collections/ContactsCollection';

Meteor.methods({
    'contacts.insert'({ name, email, imgenUrl, walletId, accion }) {
        const { userId } = this;

        if (!userId) { throw Meteor.Error('Access denied'); }

        check(name, String);
        check(email, String);
        check(imgenUrl, String);
        check(walletId, String);

        if (!name) {
            throw new Meteor.Error('Name is requerit');
        }
        if (!email) {
            throw new Meteor.Error('email is requerit');
        }

        if (!walletId) {
            throw new Meteor.Error('wallet ID is requerit');
        }

        return ContactsCollection.insert({
            name,
            email,
            imgenUrl,
            walletId,
            createdAt: new Date(),
            userId,
            logs: [{
                userUpdate: userId,
                modificAt: new Date(),
                accionUpdate: accion,
            }],
        });
    },

    'contacts.remove'({ contactId }) {
        check(contactId, String);
        // eslint-disable-next-line no-console
        console.log(
            ` contacto id: ${contactId} 
        \n
        ----------`);
        ContactsCollection.remove({ _id: contactId });
    },

    'contacts.archive'({ contactId }) {
        check(contactId, String);
        ContactsCollection.update({ _id: contactId }, { $set: { archived: true } });
    },

    'contacts.update'({ contactName, contactEmail, contactWalletId, contactId, accion }) {
        const { userId } = this;

        if (!userId) { throw Meteor.Error('Access denied'); }

        check(contactName, String);
        check(contactEmail, String);
        check(contactWalletId, String);

        if (!contactName) {
            throw new Meteor.Error('Name is required');
        }
        if (!contactEmail) {
            throw new Meteor.Error('email is required');
        }

        if (!contactWalletId) {
            throw new Meteor.Error('wallet ID is required');
        }

        if (!contactId) {
            throw new Meteor.Error(' contactId is required ');
        }

        ContactsCollection.update(
            {
                _id: contactId,

            }, {
            $push: {
                logs: {
                    userUpdate: userId,
                    modificAt: new Date(),
                    accionUpdate: accion,
                },

            },
            $set: {
                archived: false,
                name: contactName,
                email: contactEmail,
                walletId: contactWalletId,
            },
        });
    },

});
