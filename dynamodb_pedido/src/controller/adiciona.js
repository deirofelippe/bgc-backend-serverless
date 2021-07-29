const service = require('../service/adiciona');

module.exports.adicionar = async (event) => {
   const { pedido } = JSON.parse(event.body);

   let response = {
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
   }

   try {
      const urlPayment = await service.adicionar(pedido)

      response.statusCode = 200
      response.body = JSON.stringify({ urlPayment })
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ error: error.msg || 'Falha em algo.' })
   }

   return response
}