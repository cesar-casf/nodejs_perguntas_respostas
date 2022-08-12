const express = require("express")
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta") //Só por importar já executa e cria a tabela
const Resposta = require("./database/Resposta")

const log = console.log
const app = express()

connection
    .authenticate()
    .then(() => {
        log("Conectado com sucesso")
    })
    .catch((err) => {
        log(err)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [['id', 'DESC']]
    }).then((perguntas) => {
        res.render("index", {
            perguntas: perguntas
        })
    })
    
})

app.get("/perguntar", (req, res)=>{
    res.render("perguntar")
})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id
    Pergunta.findOne({ where: { id: id } })
        .then((pergunta) => {
            if (pergunta != undefined) {

                Resposta.findAll({
                    where: { pergunta_fk: pergunta.id },
                    order: [['id', 'DESC']]
                })
                .then((respostas) => {
                    res.render("pergunta", {
                        pergunta: pergunta,
                        respostas: respostas
                    })   
                })

  
            } else {
                res.redirect("/")
                }
            })
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo
    var pergunta_fk = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        pergunta_fk: pergunta_fk
    }).then(() => {
        res.redirect(`/pergunta/${pergunta_fk}`)
    })
})

app.listen(8081, () => {
    log("App rodando!")
})
