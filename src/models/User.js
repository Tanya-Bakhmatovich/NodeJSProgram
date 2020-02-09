import Sequelize from 'sequelize';
import db from '../data-access/database';

export default db.define('users', {
    Age: {
        type: Sequelize.STRING
    },
    Name: {
        type: Sequelize.STRING
    },
    Login: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    CustomId: Sequelize.NUMBER
})
