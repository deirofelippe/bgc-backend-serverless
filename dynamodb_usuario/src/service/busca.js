const dao = require('../dao/usuarioDAO');

module.exports.buscar = async id => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "id, nome, email, tipo_de_usuario, endereco",
      Key: {
         "id": id
      }
   };

   try {
      return await dao.buscar(params)
   } catch (error) {
      throw new Error(error)
   }
}