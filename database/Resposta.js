const Sequelize = require("sequelize")
const connection = require("./database")

const Resposta = connection.define("resposta", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    pergunta_fk: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({ force: false })

module.exports = Resposta