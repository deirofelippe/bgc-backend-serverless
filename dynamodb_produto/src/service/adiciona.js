const dao = require('../dao/produtoDAO');

module.exports.adicionar = async produto => {
   return await dao.adicionar(produto)
}