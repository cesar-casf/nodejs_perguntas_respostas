const Sequelize = require("sequelize")
const connection = require("./database")

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {/*json de opcoes*/ })


//Sincroniza com o bd (Cria a tabela se não existir)
//force false não força a criação da tabela, caso já exista
Pergunta.sync({ force: false }).then(() => { })

module.exports = Pergunta

                                 