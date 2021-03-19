'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.adicionar = async (event) => {
   const data = JSON.parse(event.body)

   const params = {
      TableName: 'Produto',
      Item: {
         id: data.id,
         nome: data.nome, 
         descricao: data.descricao,
         preco: data.preco,
      },
   };

   try {
      await dynamodb.put(params).promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
   } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: e.message }),
      };
   }
}

module.exports.listar = async (event) => {
   const params = {
      TableName: 'Produto',
      ProjectionExpression: "id, nome, descricao, preco"
   };

   try {
      const lista = await dynamodb.scan(params).promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify(lista.Items),
      };
   } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: e.message }),
      };
   }
}

module.exports.buscar = async (event) => {
   const id = event.pathParameters

   const params = {
      TableName: 'Produto',
      Key: {
         "id": `${id}`, 
      }
   };

   console.log(id)
   
   try {
      const result = await dynamodb.get(params).promise();

      console.log(result)
  
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
   } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: e.message }),
      };
   }
}
