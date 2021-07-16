const service = require('../service/adiciona');

module.exports.adicionar = async (event) => {
   const { pedido } = JSON.parse(event.body);

   let response = {
      statusCode: 0,
      headers: ''
   }

   try {
      const url_payment = await service.adicionar(pedido)

      response.statusCode = 301
      response.headers = { Location: url_payment }
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.headers = {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }

   return response
}