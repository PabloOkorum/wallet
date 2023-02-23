import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RoutePath } from '../imports/ui/RoutePath.jsx';

Accounts.emailTemplates.resetPassword.html = (user, url) => `${user} <br/><br/> reset your password ${url}`;

Accounts.urls.resetPassword = (token) => Meteor.absoluteUrl(
    `${RoutePath.RESET_PASSWORD.substring(1)}/${token}`
);
