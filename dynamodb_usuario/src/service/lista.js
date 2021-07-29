const dao = require('../dao/usuarioDAO');

module.exports.listar = async () => {
   return await dao.listar()
}