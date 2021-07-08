const dao = require('../dao/pedido_dao');
const { enviar_dados_pagseguro } = require('../pagamento/pagseguro');
const { enviar_email } = require('../email/email');

module.exports.adicionar = async (event) => {
   const { pedido } = JSON.parse(event.body);
   const reservas = pedido.reservas
   const usuario = pedido.usuario

   const params = {
      TableName: 'Pedido',
      Item: {
         ...pedido
      },
   };

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: ""
   }

   try {
      dao.adicionar(params)
      enviar_email(pedido, reservas, usuario)
      // enviar_dados_pagseguro()

      response.statusCode = 200
      response.body = JSON.stringify({ msg: `Reserva foi feita!` })
   } catch (error) {
      console.log(error)
      response.statusCode = 500
      response.body = JSON.stringify({ msg: "Falha em algo." })
   }

   return response
}