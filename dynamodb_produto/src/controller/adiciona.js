const service = require('../service/adiciona');

module.exports.adicionar = async event => {
   const produto = JSON.parse(event.body);

   let response = {
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
   }

   try {
      await service.adicionar(produto)

      response.statusCode = 201
   } catch (error) {
      console.log(error)

      response.statusCode = error.statusCode || 500
      response.body = JSON.stringify({ error: error.msg || 'Algo deu errado' })
   }

   return response
}