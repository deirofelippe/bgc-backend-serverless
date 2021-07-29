const dao = require('../dao/produtoDAO');

module.exports.listar = async () => {
   return await dao.listar()
}