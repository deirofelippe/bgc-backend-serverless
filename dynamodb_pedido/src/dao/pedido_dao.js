const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.adicionar = async (params) => {
   return await dynamodb.put(params).promise();
}

module.exports.listar = async (params) => {
   return await dynamodb.scan(params).promise();
}

module.exports.buscar = async (params) => {
   return await dynamodb.get(params).promise();
}

module.exports.atualizar = async (params) => {
   return await dynamodb.update(params).promise();
}

module.exports.remover = async (params) => {
   return await dynamodb.delete(params).promise();
}
