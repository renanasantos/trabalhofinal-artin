const express = require("express")
var app = express()

//const mongoose = require('./database/database')

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Parabéns você chegou até aqui!")
})

//Aberto
require("./controllers/login")(app)
require("./controllers/produtos")(app)

const middleware = require("./middleware/autenticar")
app.use(middleware)

//Fechado
require("./controllers/usuarios")(app)
require("./controllers/admin")(app)


app.use((req, res) => {
    res.send("Página não encontrada!")
})

app.listen(process.env.PORT || 80, () => {
    console.log("Servidor Online")
})