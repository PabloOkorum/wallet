import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "./WalletCollection";

Meteor.publish('wallets', function publishWallets() {
    return WalletsCollection.find();
})

