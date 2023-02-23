import { Meteor } from 'meteor/meteor';
import '../imports/api/collections/TransactionsCollections';
import { WalletsCollection } from '../imports/api/collections/WalletsCollection';
import '../imports/api/collections/ContactsCollection';
import '../imports/api/methods/ContactsMethods';
import '../imports/api/methods/TransactionsMethods';
import '../imports/api/publications/ContactsPublications';
import '../imports/api/publications/WalletPublications';
import '../infra/CustomError';
import '../infra/accounts';


Meteor.startup(() => {
    if (!WalletsCollection.find().count()) {
        WalletsCollection.insert({
            createdAt: new Date(),
        });
    }
});
