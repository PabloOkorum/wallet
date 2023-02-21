import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { TransactionsCollections } from "./TransactionsCollections";

Meteor.methods({

    'transactions.insert'(args) {

        const shema = new SimpleSchema(
            {

                isTransferring: {
                    type: Boolean,
                },
                sourceWalletId: {
                    type: String,
                },
                destinationWalledId: {
                    type: String,
                    optional: !args.isTransferring,
                },
                amount: {
                    type: Number,
                    min: 1,
                },
            }
        );

        const cleanArgs = shema.clean(args);
        shema.validate(cleanArgs);

        const { isTransferring, sourceWalletId, destinationWalledId, amount } = args;

        return TransactionsCollections.insert({
            type: isTransferring ? 'TRANSFER' : 'ADD',
            sourceWalletId,
            destinationWalledId: isTransferring ? destinationWalledId : null,
            amount,
            createdAt: new Date(),
        });
    },


})

