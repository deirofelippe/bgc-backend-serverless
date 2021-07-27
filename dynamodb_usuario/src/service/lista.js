const dao = require('../dao/usuarioDAO');

module.exports.listar = async () => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "id, nome, email, tipo_de_usuario, endereco",
   };

   return await dao.listar(params)
}