const dao = require('../dao/pedido_dao');

module.exports.listar = async (event) => {
   console.log("aqui")
   const params = {
      TableName: 'Pedido',
   };

   let response = {
      statusCode: 0,
      body: ''
   }

   try {
      const items = await dao.listar(params)

      response.statusCode = 200
      response.body = JSON.stringify({ count: items.Count, pedidos: items.Items })
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }
   
   console.log(response)
   return response
}
