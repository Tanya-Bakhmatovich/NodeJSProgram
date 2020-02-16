import Sequelize from 'sequelize';
import db from '../data-access/database';

export default db.define('users', {
    Age: {
        type: Sequelize.STRING
    },
    Login: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    group_id: {
        type: Sequelize.STRING
    }
})
