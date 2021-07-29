const dao = require('../dao/usuarioDAO');
const argon2 = require('argon2');

module.exports.atualizar = async usuario => {
   const { senha, email, id } = usuario

   if (await verificarSeEmailEstaDisponivel(email, id)) {
      throw { statusCode: 409, msg: "O email ja existe" }
   }

   const senhaCriptografada = await criptografarSenha(senha)
   usuario.senha = senhaCriptografada

   return await dao.atualizar(usuario)
}

const verificarSeEmailEstaDisponivel = async (email, id) => {
   const { Count } = await dao.buscarEmailDeOutroID(email, id)
   return Count !== 0
}

const criptografarSenha = async senha => {
   return await argon2.hash(senha, { hashLength: 10 })
}