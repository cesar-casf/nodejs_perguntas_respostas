const Sequelize = require("sequelize")

const DATABASE_NAME = 'njs_perguntas'
const DB_USER = 'postgres'
const DB_PASSWORD = 'postgres'
const DB_HOST = 'localhost'

const connection = new Sequelize(DATABASE_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres'
})

module.exports = connection