const dao = require('../dao/usuarioDAO');

module.exports.deletar = async id => {
   const params = {
      TableName: process.env.nomeTabela,
      Key: {
         "id": id
      }
   };

   await dao.deletar(params)
}