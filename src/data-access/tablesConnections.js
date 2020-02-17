import Group from '../models/Group';
import UserGroup from '../models/UserGroup';
import User from '../models/User';

export const connectTables = () => {
    Group.associate = function(models) {
        Group.belongsToMany(User, { through: models.UserGroup });
      };
    
    User.associate = function (models) {
        User.belongsToMany(Group, { through: models.UserGroup });
    };
    
    UserGroup.associate = function(models) {
        UserGroup.hasMany(models.User);
        UserGroup.hasMany(models.Group);
    };
}