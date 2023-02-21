import { Meteor } from 'meteor/meteor';
import "../imports/api/collections/TransactionsCollections";
import "../imports/api/collections/WalletsCollection";
import "../imports/api/collections/ContactsCollection";
import "../imports/api/methods/ContactsMethods";
import "../imports/api/methods/TransactionsMethods"
import "../imports/api/publications/ContactsPublications"
import "../imports/api/publications/WalletPublications"
import { WalletsCollection } from '../imports/api/collections/WalletsCollection';
import "../infra/CustomError";


Meteor.startup(() => {
    if (!WalletsCollection.find().count()) {

        WalletsCollection.insert({
            createdAt: new Date()
        });
    }
});
