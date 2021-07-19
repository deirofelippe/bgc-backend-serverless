const dao = require('../dao/usuarioDAO');

module.exports.listar = async (event) => {
   const params = {
      TableName: 'Produto',
   };
   // ProjectionExpression: "id, nome, descricao, preco"

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: ''
   }

   try {
      const result = await dao.listar(params)

      response.statusCode = 200
      response.body = JSON.stringify({ count: result.Count, produtos: result.Items })
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }
   
   console.log(response)
   return response
}
