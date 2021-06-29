const mongoose = require('../database/database')
const Produtos = mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    imagem:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    quantidade:{
        type: Number,
        required: true
    },
    preco:{
        type: Number,
        required: true
    },
    ativo:{
        type: Boolean,
        required: true
    }
})

const Produto = mongoose.model('produtos', Produtos)
module.exports = Produto