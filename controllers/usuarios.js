const express = require("express")
const route = express.Router()
const Usuario = require("../models/usuarios")

route.get("/lista", async (req, res) => {
    var lista = await Usuario.find()
    return res.send({id: req.Id, nome: req.nome})
})

route.post("/criar", async (req, res) => {
    await Usuario.create(req.body, (err, ret) =>{
        if(err)
            return res.send(err.message)
        return res.send(ret)
    })
    //return res.send(usuario)
})

module.exports = app => app.use("/usuarios", route)