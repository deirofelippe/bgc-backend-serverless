const service = require('../service/atualiza');

module.exports.atualizar = async (event) => {
   const produto = JSON.parse(event.body);
   const { id } = event.pathParameters
   produto.id = id

   let response = {
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      }
   }

   try {
      const produtoAtualizado = await service.atualizar(produto)

      response.statusCode = 200
      response.body = JSON.stringify({ ...produtoAtualizado })
   } catch (error) {
      console.log(error)

      response.statusCode = error.statusCode || 500
      response.body = JSON.stringify({ error: error.msg || 'Algo deu errado' })
   }

   return response
}