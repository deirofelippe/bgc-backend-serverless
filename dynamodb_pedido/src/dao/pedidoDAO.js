const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.adicionar = async pedido => {
   const params = {
      TableName: process.env.nomeTabela,
      Item: {
         ...pedido
      }
   };

   console.log(params);
   return await dynamodb.put(params).promise();
}

module.exports.listarPedidosDoUsuario = async idUsuario => {
   const params = {
      TableName: process.env.nomeTabela,
      FilterExpression: "idUsuario = :idUsuario",
      ExpressionAttributeValues: {
         ":idUsuario": idUsuario,
      }
   };

   return await dynamodb.scan(params).promise();
}

module.exports.listar = async () => {
   const params = {
      TableName: process.env.nomeTabela,
   };

   return await dynamodb.scan(params).promise();
}

module.exports.buscar = async (params) => {
   return await dynamodb.get(params).promise();
}

module.exports.buscarUsuarioDoPedido = async idUsuario => {
   const params = {
      TableName: 'Usuario',
      Key: {
         "id": idUsuario,
      }
   };

   return await dynamodb.get(params).promise();
}

module.exports.buscarItem = async idItem => {
   const params = {
      TableName: 'Produto',
      Key: {
         "id": idItem,
      }
   };

   return await dynamodb.get(params).promise();
}

module.exports.atualizar = async (params) => {
   return await dynamodb.update(params).promise();
}

module.exports.deletar = async (params) => {
   return await dynamodb.delete(params).promise();
}
