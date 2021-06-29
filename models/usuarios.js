const mongoose = require('../database/database')
const Usuarios = mongoose.Schema({
    usuario:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    chave: {
        type: String
    }
})

const Usuario = mongoose.model('usuarios', Usuarios)
module.exports = Usuario