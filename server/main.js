import { Meteor } from 'meteor/meteor';
import SimpleSchema from "simpl-schema";
import "../imports/api/TransactionsCollections";
import "../imports/api/TransactionsMethods"
import "../imports/api/WalletCollection";
import "../imports/api/ContactsMethods";
import "../imports/api/ContactsCollection";
import "../imports/api/ContactsPublications"
import "../imports/api/WalletPublications"
import { WalletsCollection } from '../imports/api/WalletCollection';
import "../infra/CustomError";

const walletShema = new SimpleSchema(
    {

        currency_balance: {
            type: Number,
            min: 0,
            defaultValue: 0,
        },
        currency: {
            type: String,
            allowedValues: ["USD"],
            defaultValue: "USD",
        },

        createdAt: {
            type: Date
        },
    }
);

Meteor.startup(() => {
    if (!WalletsCollection.find().count()) {

        const walletData = {

            createdAt: new Date(),
        };
        const cleanWallet = walletShema.clean(walletData);
        walletShema.validate(cleanWallet);
        WalletsCollection.insert(cleanWallet);
    }
});
