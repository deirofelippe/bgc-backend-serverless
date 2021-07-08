const dao = require('../dao/pedido_dao');

module.exports.buscar = async (event) => {
   const numero_pedido = event.pathParameters.id

   const params = {
      TableName: 'Pedido',
      Key: {
         'numero_pedido': numero_pedido
      }
   };

   let response = {
      statusCode: 0,
      body: ''
   }

   try {
      const item = await dao.buscar(params)
      console.log(item)

      response.statusCode = 200
      response.body = JSON.stringify({ pedido: item.Item })
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }

   return response
}