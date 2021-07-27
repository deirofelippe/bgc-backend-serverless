const joi = require('joi');

module.exports.schema = joi.object({
   nome: joi.string()
            .max(30)
            .required(),
   senha: joi.string()
               .min(8)
               .required(),
   email: joi.string()
               .email()
               .required(),
   endereco: {
      cep: joi.string()
               .required()
               .pattern(/^[0-9]{5}[-]?[0-9]{3}$/),
      estado: joi.string()
                  .length(2)
                  .uppercase()
                  .required(),
      cidade: joi.string()
                  .required()
                  .min(4)
                  .max(50),
      bairro: joi.string()
                  .required()
                  .min(4)
                  .max(50),
      rua: joi.string()
               .required()
               .min(4)
               .max(50),
      numero: joi.number()
                  .integer()
                  .required()
                  .max(8),
      complemento: joi.string()
                        .max(50),
   }
})