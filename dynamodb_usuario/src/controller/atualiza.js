const service = require('../service/atualiza');

module.exports.atualizar = async (event) => {
   let usuario = JSON.parse(event.body);
   usuario.id = event.pathParameters.id

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: ''
   }

   try {
      const { Attributes } = await service.atualizar(usuario)

      response.statusCode = 200
      response.body = JSON.stringify({ ...Attributes })
   } catch (error) {
      console.log(error)

      response.statusCode = error.statusCode || 500
      response.body = JSON.stringify({ error: error.msg || 'Algo deu errado' })
   }

   return response
}