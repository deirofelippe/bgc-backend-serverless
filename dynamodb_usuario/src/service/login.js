const dao = require('../dao/usuarioDAO');
const argon2 = require('argon2');

module.exports.login = async ({ email, senha }) => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "senha",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
         ":email": email,
     }
   };

   let result
   try {
      result = await dao.buscarSenha(params)
   } catch (error) {
      throw new Error(error)
   }

   const { senha: senhaCriptografada } = result.Items[0]

   try {
      if(await argon2.verify(senhaCriptografada, senha, { hashLength: 10 })){
         return
      }
      throw new Error('Dado incorreto')
   } catch (error) {
      throw new Error(error)
   }
}