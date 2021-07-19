const dao = require('../dao/usuarioDAO');
const uuid = require('uuid');
const argon2 = require('argon2');

module.exports.adicionar = async usuario => {
   let hash

   try {
      hash = await argon2.hash(usuario.senha, { hashLength: 10 })
   } catch (error) {
      throw new Error(error)
   }

   const params = {
      TableName: process.env.nomeTabela,
      Item: {
         id: uuid.v1(),
         nome: usuario.nome, 
         email: usuario.email,
         senha: hash,
         tipo_de_usuario: usuario.tipo_de_usuario,
         endereco: { ...usuario.endereco }
      },
   };

   try {
      await dao.adicionar(params)
   } catch (error) {
      throw new Error(error)
   }
}