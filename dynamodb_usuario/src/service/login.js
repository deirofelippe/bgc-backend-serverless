const dao = require('../dao/usuarioDAO');
const argon2 = require('argon2');

module.exports.login = async login => {
   const { email, senha } = login
   const senhaCriptografada = await buscarSenha(email)
   await verificarSeSenhaSaoIguais(senhaCriptografada, senha)
}

const verificarSeSenhaSaoIguais = async (senhaCriptografada, senha) => {
   const senhaSaoIguais = await argon2.verify(senhaCriptografada, senha, { hashLength: 10 })
   if(!senhaSaoIguais){
      throw { statusCode: 409, msg: 'Email e/ou senha estão incorretos' }
   }
}

const buscarSenha = async email => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "senha",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
         ":email": email,
     }
   };

   const result = await dao.buscarSenha(params)

   const naoExisteUsuario = result.Count === 0
   if(naoExisteUsuario){
      throw { statusCode: 409, msg: 'Email e/ou senha estão incorretos' }
   }

   const { senha: senhaCriptografada } = result.Items[0]
   return senhaCriptografada
}