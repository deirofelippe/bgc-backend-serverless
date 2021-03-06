const service = require('../service/deleta');

module.exports.deletar = async (event) => {
   const { id } = event.pathParameters

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
   }

   try {
      await service.deletar(id)

      response.statusCode = 204
   } catch (error) {
      console.log(error)

      response.statusCode = error.statusCode || 500
      response.body = JSON.stringify({ error: error.msg || 'Algo deu errado' })
   }
   
   return response
}