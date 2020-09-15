const { Sequelize } = require('sequelize');
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres'
});

export default sequelize;
