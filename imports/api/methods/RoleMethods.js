import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { WalletsRoles } from '../../../infra/WalletsRoles';

Meteor.methods({
    'role.isAdmin'() {
        const { userId } = this;
        if (!userId) {
            throw new Error('Access denied');
        }
        return Roles.userIsInRole(userId, WalletsRoles.ADMIN);
    },
});
