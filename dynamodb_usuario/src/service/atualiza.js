const dao = require('../dao/usuarioDAO');
const argon2 = require('argon2');

module.exports.atualizar = async usuario => {
   const { id, nome, email, tipo_de_usuario, endereco } = usuario
   let { senha } = usuario

   try {
      senha = await encriptarSenha(senha)
   } catch (error) {
      throw new Error(error)
   }

   const params = {
      TableName: process.env.nomeTabela,
      Key: {
         'id': id
      },
      UpdateExpression: 'set nome = :nome, email = :email, tipo_de_usuario = :tipo_de_usuario, senha = :senha, endereco.cep = :cep, endereco.estado = :estado, endereco.cidade = :cidade, endereco.bairro = :bairro, endereco.rua = :rua, endereco.numero = :numero, endereco.complemento = :complemento',
      ExpressionAttributeValues:{
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
      ReturnValues:'ALL_NEW'
   };

   try {
      return await dao.atualizar(params)
   } catch (error) {
      throw new Error(error)
   }
}

const encriptarSenha = async senha => {
   return await argon2.hash(senha, { hashLength: 10 })
}