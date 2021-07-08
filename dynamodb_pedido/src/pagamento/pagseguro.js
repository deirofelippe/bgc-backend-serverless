const axios = require('axios');

module.exports.enviar_dados_pagseguro = async () => {
   const url = `https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=${variaveis.PAGSEGURO_EMAIL}&token=${variaveis.PAGSEGURO_TOKEN_SANDBOX}`
   const params = {
      nome: ""
   }
   await axios.post(url, params)
}