const service = require('../service/busca');

module.exports.buscar = async (event) => {
   const { id } = event.pathParameters

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
   }

   try {
      const result = await service.buscar(id)

      response.statusCode = 200
      response.body = JSON.stringify(result.Item)
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }

   return response
}