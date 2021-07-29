const service = require('../service/lista');

module.exports.listar = async () => {
   let response = {
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
   }

   try {
      const result = await service.listar()

      response.statusCode = 200
      response.body = JSON.stringify({ count: result.Count, usuarios: result.Items })
   } catch (error) {
      console.log(error)

      response.statusCode = error.statusCode || 500
      response.body = JSON.stringify({ error: error.msg || 'Algo deu errado' })
   }
   
   return response
}
