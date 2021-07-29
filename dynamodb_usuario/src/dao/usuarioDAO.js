const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.adicionar = async usuario => {
   const { senha, nome, email, tipo_de_usuario, endereco } = usuario

   const params = {
      TableName: process.env.nomeTabela,
      Item: {
         id: uuid.v1(),
         nome: nome,
         email: email,
         senha: senha,
         tipo_de_usuario: tipo_de_usuario,
         endereco: { ...endereco }
      },
   };
   console.log(params);

   return await dynamodb.put(params).promise();
}

module.exports.listar = async () => {
   const params = {
      TableName: process.env.nomeTabela
   };

   return await dynamodb.scan(params).promise();
}

module.exports.listarComSenha = async (params) => {
   return await dynamodb.scan(params).promise();
}

module.exports.buscarSenha = async email => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "senha",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
         ":email": email,
      }
   };

   return await dynamodb.scan(params).promise();
}

module.exports.buscar = async id => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "id, nome, email, tipo_de_usuario, endereco",
      Key: {
         "id": id
      }
   };

   return await dynamodb.get(params).promise();
}

module.exports.buscarUsuarioComSenha = async (params) => {
   return await dynamodb.get(params).promise();
}

module.exports.buscarEmail = async email => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "email",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
         ":email": email,
      }
   };

   return await dynamodb.scan(params).promise();
}

module.exports.buscarEmailDeOutroID = async (email, id) => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "email",
      FilterExpression: "email = :email and id <> :id",
      ExpressionAttributeValues: {
         ":email": email,
         ":id": id,
      }
   };

   return await dynamodb.scan(params).promise();
}

module.exports.atualizar = async usuario => {
   const { id, nome, senha, email, tipo_de_usuario, endereco } = usuario

   const params = {
      TableName: process.env.nomeTabela,
      Key: {
         'id': id
      },
      UpdateExpression: 'set nome = :nome, email = :email, tipo_de_usuario = :tipo_de_usuario, senha = :senha, endereco.cep = :cep, endereco.estado = :estado, endereco.cidade = :cidade, endereco.bairro = :bairro, endereco.rua = :rua, endereco.numero = :numero, endereco.complemento = :complemento',
      ExpressionAttributeValues: {
         ':nome': nome,
         ':email': email,
         ':tipo_de_usuario': tipo_de_usuario,
         ':senha': senha,
         ':cep': endereco.cep,
         ':estado': endereco.estado,
         ':cidade': endereco.cidade,
         ':bairro': endereco.bairro,
         ':rua': endereco.rua,
         ':numero': endereco.numero,
         ':complemento': endereco.complemento,
      },
      ReturnValues: 'ALL_NEW'
   };

   return await dynamodb.update(params).promise();
}

module.exports.deletar = async id => {
   const params = {
      TableName: process.env.nomeTabela,
      Key: {
         "id": id
      }
   };

   return await dynamodb.delete(params).promise();
}
