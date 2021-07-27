const dao = require('../dao/produto_dao');

module.exports.listar = async () => {
   const params = {
      TableName: process.env.nomeTabela,
   };

   return await dao.listar(params)
}