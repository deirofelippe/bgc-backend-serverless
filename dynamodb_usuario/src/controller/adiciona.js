const service = require('../service/adiciona');

module.exports.adicionar = async event => {
   const usuario = JSON.parse(event.body);

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
   }

   try {
      await service.adicionar(usuario)

      response.statusCode = 204
   } catch (error) {
      console.error(error)

      response.statusCode = error.statusCode || 500
      response.body = JSON.stringify({ error: error.msg || 'Algo deu errado' })
   }

   return response
}