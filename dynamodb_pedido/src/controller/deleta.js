const dao = require('../dao/pedido_dao');

module.exports.deletar = async (event) => {
   const { numero_pedido } = JSON.parse(event.body);

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
      const items = await dao.deletar(params)

      response.statusCode = 204
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }
   
   console.log(response)
   return
}