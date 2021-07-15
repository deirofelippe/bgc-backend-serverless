const dao = require('../dao/produto_dao');

module.exports.buscar = async (event) => {
   const { id } = event.pathParameters

   const params = {
      TableName: 'Produto',
      Key: {
         'id': id, 
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
      const result = await dao.buscar(params)

      response.statusCode = 200
      response.body = JSON.stringify({ pedido: result.Item })
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }

   return response
}