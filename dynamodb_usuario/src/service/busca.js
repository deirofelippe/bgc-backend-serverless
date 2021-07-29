const dao = require('../dao/usuarioDAO');

module.exports.buscar = async id => {
   const { Item } = await dao.buscar(id)

   const naoEncontrou = Item === undefined

   if (naoEncontrou) {
      throw { statusCode: 409, msg: "Usuario não encontrado" }
   }

   return { ...Item }
}