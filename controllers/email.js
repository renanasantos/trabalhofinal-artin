const express = require("express")
const nodemailer = require("nodemailer")

var configuracoes = nodemailer.createTransport({
    host: "smtp.office365.com", //"outlook.office365.com",
    port: 587,
    auth: {
        user: "renanas.trabalhoartin@outlook.com",
        pass: "Renanasartin"
    }
})

const esqueciSenha = (email, codigo, nome) => {
    var data = {
        from: {
            "address": "renanas.trabalhoartin@outlook.com",
            "name": "Aula de Artin - Escobar"
        },
        to: email,
        subject: "Solicitação de troca de senha",
        html: `<html>
        <head>
            <style>
                .assinatura{
                    color: red;
                }
                .botao{
                    text-decoration: none;
                    color: #fff;
                    border: 1px solid gray;
                    border-top: none;
                    border-left: none;
                    padding: 10px;
                    border-radius: 20px;
                    background-color: red;
                }
                .botao:hover{
                    text-decoration: none;
                    color: black;
                    border: 1px solid gray;
                    border-bottom: none;
                    border-right: none;
                    padding: 10px;
                    border-radius: 20px;
                    background-color: greenyellow;
                }
            </style>
        </head>
        <body>
            <h2>Olá ${nome}!</h2>
            <p>Recebemos sua solicitação para a troca da sua senha.</p>
            <p>Caso não tenha sido você que solicitou, por favor, ignore este e-mail.</p>
            <p>Se você solicitou, anote seu código ${codigo} e clique no botão abaixo para efetuar a alteração.</p>
            <br>
            <a href="http://ite.edu.br" class="botao">Clique Aqui</a>
            <br>
            <br>
            <div class="assinatura">
                Atenciosamente, Aula de Artin.
            </div>
        </body>
    </html>
    `
    }

    return data
}

const senhaAlterada = (email, nome) => {
    var data = {
        from: {
            "address": "renanas.trabalhoartin@outlook.com",
            "name": "Aula de Artin - Escobar"
        },
        to: email,
        subject: "Confirmação de troca de senha",
        html: `
            Olá ${nome}<br>
            Sua senha foi alterada com sucesso!
           `
    }

    return data
}

const enviar = async (email, codigo, nome, tipo) => {
    var opcoes
    if(tipo == "esqueciSenha")
        opcoes = esqueciSenha(email, codigo, nome)

    if(tipo == "senhaAlterada")
        opcoes = senhaAlterada(email, nome)

    await configuracoes.sendMail(opcoes, (err, info) =>{
        
    })
}

module.exports = {enviar}