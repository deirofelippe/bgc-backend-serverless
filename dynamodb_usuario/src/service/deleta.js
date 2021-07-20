const dao = require('../dao/usuarioDAO');

module.exports.deletar = async id => {
   const params = {
      TableName: process.env.nomeTabela,
      Key: {
         "id": id
      }
   };

   try {
      return await dao.deletar(params)
   } catch (error) {
      throw new Error(error)
   }
}