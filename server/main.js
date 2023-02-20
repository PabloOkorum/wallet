import { Meteor } from 'meteor/meteor';
import "../imports/api/TransactionsCollections";
import "../imports/api/TransactionsMethods"
import "../imports/api/WalletCollection";
import "../imports/api/ContactsMethods";
import "../imports/api/ContactsCollection";
import "../imports/api/ContactsPublications"
import "../imports/api/WalletPublications"
import { WalletsCollection } from '../imports/api/WalletCollection';



Meteor.startup( () => {

    if (!WalletsCollection.find().count()) {

        WalletsCollection.insert({
            balance: 0,
            currency: "USD",
            createdAt: new Date(),
        });
    }
});
