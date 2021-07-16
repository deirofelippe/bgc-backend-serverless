const dao = require('../dao/produto_dao');

module.exports.deletar = async (event) => {
   const { id } = event.pathParameters

   const params = {
      TableName: 'Produto',
      Key: {
         'id': id
      }
   };

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: ''
   }

   try {
      await dao.deletar(params)

      response.statusCode = 204
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }
   
   return response
}