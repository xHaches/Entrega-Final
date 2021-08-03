const Sequelize = require('sequelize');



const sequelize = new Sequelize('EStore', null, null, {
    dialect: 'mssql',
    server: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
        authentication: {
            type: 'default',
            options: {
                encrypt: true,
                userName: process.env.BD_USER,
                password: process.env.DB_PASSWORD
            }
        }
    }
});

module.exports = sequelize;
