const axios = require('axios');
const parser = require('xml2json');
const variaveis = require('../../variaveis');

module.exports.finalizar_compra = async pedido => {
   const body = montar_body(pedido)
   const code = await obter_autorizacao(body)
   return url_pagseguro.sandbox_payment(code)
}

const obter_autorizacao = async body => {
   const url_autorizacao = url_pagseguro.sandbox_autorizacao()
   let response = await axios.post(url_autorizacao, body)
   response = parser.toJson(response.data)
   response = JSON.parse(response)
   return response.checkout.code
}

const montar_body = pedido => {
   const { reservas, usuario } = pedido

   const formData = new URLSearchParams()

   formData.append('currency', 'BRL')
   formData.append('reference', pedido.numero_pedido)
   
   reservas.forEach((reserva, indice) => {
      indice++
      formData.append(`itemId${indice}`, indice)
      formData.append(`itemDescription${indice}`, reserva.nome)
      formData.append(`itemAmount${indice}`, parseFloat(reserva.preco).toFixed(2))
      formData.append(`itemQuantity${indice}`, reserva.quantidade)
   })
   
   // formData.append('shippingAddressRequired', 'False')
   // formData.append('shippingAddressPostalCode', endereco.cep) // num 8 digitos
   // formData.append('shippingAddressState', endereco.estado)
   // formData.append('shippingAddressCity', endereco.cidade) // RJ SP ...
   // formData.append('shippingAddressDistrict', endereco.bairro)
   // formData.append('shippingAddressStreet', endereco.rua)
   // formData.append('shippingAddressNumber', endereco.numero)
   // formData.append('shippingAddressComplement', endereco.complemento)
   
   // body += `shippingType=2` //1 - pac, 2 - sedex, 3 - outro
   // body += `shippingCost=${frete}`
   
   // body += `senderCPF=${cpf}`
   // body += `senderAreaCode=${ddd}`
   // body += `senderPhone=${telefone}`
   // body += `sender=${peso}`

   // body += `extraAmount=${peso}`

   return formData
}

const url_pagseguro = {
   email: variaveis.PAGSEGURO_EMAIL,
   token_sandbox: variaveis.PAGSEGURO_TOKEN_SANDBOX,
   token_prod: variaveis.PAGSEGURO_TOKEN_PROD,
   sandbox_autorizacao(){
      return `https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=${this.email}&token=${this.token_sandbox}`
   },
   sandbox_payment(code){
      return `https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${code}`
   },
   prod_autorizacao(){
      return `https://ws.pagseguro.uol.com.br/v2/checkout?email=${this.email}&token=${this.token_prod}`
   },
   prod_payment(code){
      return `https://pagseguro.uol.com.br/v2/checkout/payment.html?code=${code}`
   }
}