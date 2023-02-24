import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { WalletsRoles } from './WalletsRoles';


Roles.createRole(WalletsRoles.ADMIN, { unlessExists: true });

Meteor.startup(() => {
    const user = Meteor.users.findOne({ email: 'pablo@gmail.com' });
    if (!user || Roles.userIsInRole(user._id, WalletsRoles.ADMIN)) {
        return;
    }
    Roles.addUsersToRoles(user._id, WalletsRoles.ADMIN);
});
