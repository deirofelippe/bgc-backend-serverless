const dao = require('../dao/usuarioDAO');
const argon2 = require('argon2');

module.exports.atualizar = async usuario => {

   const { senha, email, id } = usuario

   if (await verificarSeEmailExiste(email, id)) {
      throw new Error('Email ja existe')
   }

   const senhaCriptografada = await criptografarSenha(senha)
   usuario.senha = senhaCriptografada

   try {
      return await atualizar(usuario)
   } catch (error) {
      throw new Error(error)
   }
}

const verificarSeEmailExiste = async (email, id) => {
   const params = {
      TableName: process.env.nomeTabela,
      ProjectionExpression: "email",
      FilterExpression: "email = :email and id <> :id",
      ExpressionAttributeValues: {
         ":email": email,
         ":id": id,
      }
   };

   const result = await dao.buscarPeloEmail(params)

   const emailExiste = result.Count !== 0

   return emailExiste
}

const criptografarSenha = async senha => {
   return await argon2.hash(senha, { hashLength: 10 })
}

const atualizar = async usuario => {
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

   return await dao.atualizar(params)
}