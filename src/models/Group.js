import Sequelize from 'sequelize';
import db from '../data-access/database';

export default db.define('groups', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    permission: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
});
