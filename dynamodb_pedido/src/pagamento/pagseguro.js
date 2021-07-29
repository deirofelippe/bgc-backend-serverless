const axios = require('axios');
const convert = require('xml-js');
const variaveis = require('../../variaveis');

module.exports.finalizarCompra = async pedido => {
   const body = montarBody(pedido)
   const code = await obterAutorizacao(body)
   return urlPagseguro.sandboxPayment(code)
}

const obterAutorizacao = async body => {
   const urlAutorizacao = urlPagseguro.sandboxAutorizacao()
   let response = await axios.post(urlAutorizacao, body)
   response = convert.xml2json(response.data, { compact: true, spaces: 4 })
   response = JSON.parse(response)

   return response.checkout.code._text
}

const montarBody = pedido => {
   const { itens, usuario: { endereco } } = pedido

   endereco.cep = endereco.cep.replace(/[^0-9]/, '')

   const formData = new URLSearchParams()

   formData.append('currency', 'BRL')
   formData.append('reference', pedido.numeroPedido)

   itens.forEach((item, indice) => {
      indice++
      formData.append(`itemId${indice}`, item.id)
      formData.append(`itemDescription${indice}`, item.nome)
      formData.append(`itemAmount${indice}`, parseFloat(item.preco).toFixed(2))
      formData.append(`itemQuantity${indice}`, item.quantidade)
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

const urlPagseguro = {
   email: variaveis.PAGSEGURO_EMAIL,
   tokenSandbox: variaveis.PAGSEGURO_TOKEN_SANDBOX,
   tokenProd: variaveis.PAGSEGURO_TOKEN_PROD,
   sandboxAutorizacao() {
      return `https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=${this.email}&token=${this.tokenSandbox}`
   },
   sandboxPayment(code) {
      return `https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${code}`
   },
   prodAutorizacao() {
      return `https://ws.pagseguro.uol.com.br/v2/checkout?email=${this.email}&token=${this.tokenProd}`
   },
   prodPayment(code) {
      return `https://pagseguro.uol.com.br/v2/checkout/payment.html?code=${code}`
   }
}