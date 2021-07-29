const dao = require('../dao/produtoDAO');

module.exports.buscar = async id => {
   const { Item } = await dao.buscar(id)

   const naoEncontrou = Item === undefined

   if (naoEncontrou) {
      throw { statusCode: 409, msg: "Produto não encontrado" }
   }

   return { ...Item }
}