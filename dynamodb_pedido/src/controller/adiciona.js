const service = require('../service/adiciona');

module.exports.adicionar = async (event) => {
   const { pedido } = JSON.parse(event.body);

   console.log(pedido)

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
   }

   try {
      const url_payment = await service.adicionar(pedido)

      response.statusCode = 200
      response.body = JSON.stringify({ url_payment: url_payment })
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }

   console.log(response)

   return response
}