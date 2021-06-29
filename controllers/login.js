const express = require("express")

const route = express.Router()

const Usuario = require("../models/usuarios")

const Email = require("./email")

const jwt = require("jsonwebtoken")

require("dotenv/config")

route.post("/login", async (req, res) => {
    const{usuario, senha} = req.body

    var dados = await Usuario.findOne({usuario: usuario})

    if(dados){
        if(dados.senha === senha)
        {
            const token = jwt.sign({
                userId: dados._id,
                userNome: dados.nome
            }, process.env.SEGUR, {expiresIn: 86400});
            var nome = dados.nome;
            return res.send({token, nome})
        }
        else
            return res.send("Senha Inválida!")
    }
    return res.send("Usuário não encontrado!")
})

route.post("/esquecisenha", async (req, res) => {
    const{email} = req.body;

    var retorno = await Usuario.findOne({email: email})

    if (retorno == null) {
        res.send("E-mail não encontrado!")
        return false
    }

    var chave = [
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9),
        "-",
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9)
    ]

    var texto = chave.join('')
    retorno.chave = texto
    const ret = await Usuario.updateOne({_id: retorno._id}, {$set: {chave: retorno.chave}})

    res.send("Um e-mail foi enviado para você trocar a senha!")

    await Email.enviar(retorno.email, retorno.chave, retorno.nome, "esqueciSenha")
})

route.post("./alterarsenha", async (req, res) => {
    const{email, codigo} = req.body

    var dados  = await Usuario.findOne({email: email})

    if(dados == null) {
        res.send("E-mail não econtrado!")
        return false
    }

    if(codigo != dados.chave) {
        res.send("Chave Inválida!")
        return false
    }

    res.send(true)
})

route.post("/confirmasenha", async (req, res) => {
    const{senha, codigo, email} = req.body

    var dados = await Usuario.findOne({email: email})

    if(dados == null) {
        res.send("E-mail não econtrado!")
        return false
    }

    if(codigo != dados.chave) {
        res.send("Chave Inválida!")
        return false
    }

    dados.senha = senha

    var retorno = Usuario.updateOne({_id: dados._id}, {$set: {senha}})

    await Email.enviar(retorno.email, "", retorno.nome, "senhaAlterada")

    res.send(true)
})


module.exports = app => app.use("", route)