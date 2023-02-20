import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TransactionsCollections } from "./TransactionsCollections";

Meteor.methods({

    'transactions.insert'({
        isTransferring,
        sourceWalletId,
        destinationWalledId,
        amount
    }) {

        check(isTransferring, Boolean);
        check(sourceWalletId, String);
        check(destinationWalledId, String);
        check(amount, Number);

        if (!amount || amount <= 0) {
            throw new Meteor.Error("Amount is requerit");
        }
        if (!sourceWalletId) {
            throw new Meteor.Error("Source Wallet is requerit");
        }
        if (!destinationWalledId && !isTransferring) {
            throw new Meteor.Error("Destination Walled is requerit");
        }


        return TransactionsCollections.insert({
            type: isTransferring ? 'TRANSFER' : 'ADD',
            sourceWalletId,
            destinationWalledId: isTransferring ? destinationWalledId : null,
            amount,
            createdAt: new Date(),
        });
    },


})

