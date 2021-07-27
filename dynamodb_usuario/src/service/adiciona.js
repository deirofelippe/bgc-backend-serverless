const dao = require('../dao/usuarioDAO');
const uuid = require('uuid');
const argon2 = require('argon2');
const { schema } = require('../validacao');

module.exports.adicionar = async usuario => {
   let { email, senha } = usuario

   await validar(usuario)

   if (await verificarSeEmailExiste(email)) {
      throw { statusCode: 409, msg: "O email ja existe" }
   }

   senha = await criptografarSenha(senha)

   await adicionar({ ...usuario, senha })
}

const validar = usuario => {
   const result = schema.validate(usuario)

   const naoTemErro = result.error === undefined
   if (naoTemErro) return

   const erros = result.error.details.map((erro) => {
      return {
         campo: erro.context.label,
         mensagem: erro.message
      }
   })

   throw { statusCode: 409, msg: erros }
}

const criptografarSenha = async senha => {
   return await argon2.hash(senha, { hashLength: 10 })
}

const adicionar = async usuario => {
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

   await dao.adicionar(params)
}

const verificarSeEmailExiste = async email => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "email",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
         ":email": email,
      }
   };

   const result = await dao.buscarPeloEmail(params)

   if (result.Count === 0) return false

   return true
}