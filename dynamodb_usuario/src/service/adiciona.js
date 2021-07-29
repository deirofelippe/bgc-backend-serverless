const dao = require('../dao/usuarioDAO');
const argon2 = require('argon2');
const { schema } = require('../validacao');

module.exports.adicionar = async usuario => {
   let { email, senha } = usuario

   // await validar(usuario)

   if (await verificarSeEmailExiste(email)) {
      throw { statusCode: 409, msg: "O email ja existe" }
   }

   senha = await criptografarSenha(senha)

   dao.adicionar({ ...usuario, senha })
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

const verificarSeEmailExiste = async email => {
   const { Count } = await dao.buscarEmail(email)
   return Count !== 0
}