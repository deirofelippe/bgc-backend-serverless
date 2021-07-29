const service = require('../service/busca');

module.exports.buscar = async (event) => {
   const { id } = event.pathParameters

   let response = {
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
   }

   try {
      const produto = await service.buscar(id)

      response.statusCode = 200
      response.body = JSON.stringify({ ...produto })
   } catch (error) {
      console.log(error)

      response.statusCode = error.statusCode || 500
      response.body = JSON.stringify({ error: error.msg || 'Algo deu errado' })
   }

   return response
}