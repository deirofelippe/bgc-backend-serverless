const dao = require('../dao/pedido_dao');

module.exports.listar = async (event) => {
   const params = {
      TableName: 'Pedido',
   };

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: ""
   }

   try {
      const pedidos = await dao.listar(params)

      response.statusCode = 200
      response.body = JSON.stringify({ pedidos: pedidos.Items, count: pedidos.Count })
   } catch (error) {
      console.log(error)
      response.statusCode = 500
      response.body = JSON.stringify({ msg: "Falha em algo." })
   }
   
   console.log(response)
   return
}
