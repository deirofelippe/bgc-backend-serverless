const dao = require('../dao/produtoDAO');

module.exports.deletar = async id => {
   return await dao.deletar(id)
}