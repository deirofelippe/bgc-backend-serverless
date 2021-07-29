const dao = require('../dao/produtoDAO');

module.exports.atualizar = async produto => {
   const { Attributes: produtoAtualizado } = await dao.atualizar(produto)
   return produtoAtualizado
}