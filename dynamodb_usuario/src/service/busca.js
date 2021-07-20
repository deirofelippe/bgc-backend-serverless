const dao = require('../dao/usuarioDAO');

module.exports.buscar = async id => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "id, nome, email, tipo_de_usuario, endereco",
      Key: {
         "id": id
      }
   };

   const result = await dao.buscar(params)

   if (result.Item === undefined) throw {statusCode: 400, msg: "Usuario não encontrado"}

   return result.Item
}