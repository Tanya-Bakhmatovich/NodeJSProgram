import Sequelize from 'sequelize';
import db from '../data-access/database';

export default db.define('UserGroup', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    groupId: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.STRING
    }
});

