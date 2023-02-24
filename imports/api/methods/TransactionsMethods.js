import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema from 'simpl-schema';
import { WalletsRoles } from '../../../infra/WalletsRoles';


import {
    TransactionsCollection,
    TRANSFER_TYPE,
    ADD_TYPE,
} from '../collections/TransactionsCollections';

Meteor.methods({
    'transactions.insert'(args) {
        const { userId } = this;
        if (!userId) { throw Meteor.Error('Access denied'); }

        const schema = new SimpleSchema({
            isTransferring: {
                type: Boolean,
            },
            sourceWalletId: {
                type: String,
            },
            destinationContacsId: {
                type: String,
                optional: !args.isTransferring,
            },
            amount: {
                type: Number,
                min: 1,
            },
        });

        const cleanArgs = schema.clean(args);
        schema.validate(cleanArgs);

        const { isTransferring, sourceWalletId, destinationContacsId, amount } =
            args;
        return TransactionsCollection.insert({
            type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
            sourceWalletId,
            destinationContacsId: isTransferring ? destinationContacsId : null,
            amount,
            createdAt: new Date(),
            userId,

        });
    },

    'transactions.remove'(transactionsId) {
        const { userId } = this;
        if (!userId) {
            throw Meteor.Error('Access denied');
        }

        check(transactionsId, String);

        if (!Roles.userIsInRole(userId, WalletsRoles.ADMIN)) {
            throw Meteor.Error('Access denied');
        }

        return TransactionsCollection.remove(transactionsId);
    },


});
