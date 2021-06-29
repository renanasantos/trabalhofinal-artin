const express = require("express")
const route = express.Router()
const Produto = require("../models/produtos")

route.get("/", async (req, res) => {
    var lista = await Produto.find()
    return res.send(lista)
})

module.exports = app => app.use("/lista/produtos", route)