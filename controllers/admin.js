const express = require("express")
const { PromiseProvider } = require("mongoose")
const route = express.Router()
const Produto = require("../models/produtos")

route.post("/", async (req, res) => {
    await Produto.create(req.body, (err, ret) =>{
        if(err)
            return res.send(err.message)
        return res.send(ret)
    })
})

route.put("/", async (req, res) => {

    const{id} = req.body;
    console.log(id)
    var retorno = await Produto.findOne({_id: id})
    if (retorno == null) {
        res.send("ID não encontrado!")
            return false
    }
    const ret = await Produto.updateOne({_id: retorno._id}, 
        {$set: {nome: req.body.nome, imagem: req.body.imagem, descricao: req.body.descricao, quantidade: req.body.quantidade, preco: req.body.preco, ativo: req.body.ativo}})
    
    var dados = await Produto.findOne({_id: id})
    res.send(dados);
})

route.delete("/", async (req, res) => {

    const{id} = req.body;
    console.log(id)
    var retorno = await Produto.findOne({_id: id})
    if (retorno == null) {
        res.send("ID não encontrado!")
            return false
    }
    const ret = await Produto.updateOne({_id: retorno._id}, {$set: {ativo: "false"}})
    
    var dados = await Produto.findOne({_id: id})
    res.send(dados);
})

module.exports = app => app.use("/admin/produtos", route)