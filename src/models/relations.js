import User from '../models/User';
import Group from '../models/Group';
import UserGroup from '../models/UserGroup';

User.belongsTo(UserGroup);
Group.belongsTo(UserGroup);
UserGroup.hasMany(User);
UserGroup.hasMany(Group);