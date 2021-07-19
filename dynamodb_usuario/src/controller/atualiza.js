const dao = require('../dao/produto_dao');

module.exports.atualizar = async (event) => {
   const { nome, descricao, preco } = JSON.parse(event.body);
   const { id } = event.pathParameters

   const params = {
      TableName: 'Produto',
      Key: {
         'id': id
      },
      UpdateExpression: 'set nome = :nome, descricao = :descricao, preco = :preco',
      ExpressionAttributeValues:{
         ':nome': nome,
         ':descricao': descricao,
         ':preco': preco,
      },
      ReturnValues:'ALL_NEW'
   };

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: ''
   }

   try {
      const result = await dao.atualizar(params)

      response.statusCode = 200
      response.body = JSON.stringify(result.Attributes)
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }

   return response
}