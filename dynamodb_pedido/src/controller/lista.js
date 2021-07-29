const service = require('../service/lista');

module.exports.listar = async (event) => {
   const { idUsuario } = event.pathParameters

   let response = {
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
   }

   try {
      const { pedidos, count } = await service.listar(idUsuario)

      response.statusCode = 200
      response.body = JSON.stringify({ count, pedidos })
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ error: error.msg || 'Falha em algo.' })
   }

   return response
}
