const dao = require('../dao/usuarioDAO');

module.exports.deletar = async id => {
   await dao.deletar(id)
}