const service = require('../service/busca');

module.exports.buscar = async (event) => {
   const { id } = event.pathParameters

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
   }

   try {
      const usuario = await service.buscar(id)

      response.statusCode = 200
      response.body = JSON.stringify(usuario)
   } catch (error) {
      console.log(error)

      response.statusCode = error.statusCode || 500
      response.body = JSON.stringify({ error: error.msg || 'Algo deu errado' })
   }

   return response
}