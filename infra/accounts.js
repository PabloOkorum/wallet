import { Accounts } from 'meteor/accounts-base';
import { WalletsCollection } from '../imports/api/collections/WalletsCollection';
import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

const getEmailFromUser = user => {
    if (user.services?.google) {
        return user.services.google.email;
    }

    return user.emails;
};

Accounts.onCreateUser((_option, user) => {
    const customizedUser = { ...user };

    WalletsCollection.insert({ userId: user._id, createdAt: new Date() });
    customizedUser.email = getEmailFromUser(user);

    //  customizedUser.email = user.emails[0].address;

    return customizedUser;
});

Accounts.setDefaultPublishFields({

    ...Accounts._defaultPublishFields.projection,
    email: 1,

});

const settings = Meteor.settings || {};
Meteor.startup(() => {
    if (!settings.googleClientId || !settings.googleSecret) {
        throw new Error('googleClientId and googleSecret are requierd');
    }
   Accounts.config({ restrictCreationByEmailDomain: 'okorum.com' });
    ServiceConfiguration.configurations.upsert({
        service: 'google',
    }, {
        $set: {
            service: 'google',
            clientId: settings.googleClientId,
            secret: settings.googleSecret,
        },
    });
});
