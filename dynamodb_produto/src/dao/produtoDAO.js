const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.adicionar = async produto => {
   const { nome, descricao, preco } = produto
   const params = {
      TableName: process.env.nomeTabela,
      Item: {
         id: uuid.v1(),
         nome,
         descricao,
         preco,
      }
   };

   console.log(params);
   return await dynamodb.put(params).promise();
}

module.exports.listar = async () => {
   const params = {
      TableName: process.env.nomeTabela,
   };

   return await dynamodb.scan(params).promise();
}

module.exports.buscar = async id => {
   const params = {
      TableName: process.env.nomeTabela,
      Key: {
         'id': id,
      }
   };

   return await dynamodb.get(params).promise();
}

module.exports.atualizar = async produto => {
   const { id, nome, descricao, preco } = produto

   const params = {
      TableName: process.env.nomeTabela,
      Key: {
         'id': id
      },
      UpdateExpression: 'set nome = :nome, descricao = :descricao, preco = :preco',
      ExpressionAttributeValues: {
         ':nome': nome,
         ':descricao': descricao,
         ':preco': preco,
      },
      ReturnValues: 'ALL_NEW'
   };

   return await dynamodb.update(params).promise();
}

module.exports.deletar = async id => {
   const params = {
      TableName: process.env.nomeTabela,
      Key: {
         'id': id
      }
   };

   return await dynamodb.delete(params).promise();
}
