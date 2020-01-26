import Sequelize from 'sequelize';

export default new Sequelize('postgres', 'postgres', 'postgres210120', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });