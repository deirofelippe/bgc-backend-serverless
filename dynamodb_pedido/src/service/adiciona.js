const dao = require('../dao/pedido_dao');
const { finalizar_compra } = require('../pagamento/pagseguro');
const { enviar_email } = require('../email/email');

module.exports.adicionar = async (pedido) => {
   const reservas = pedido.reservas
   const usuario = pedido.usuario

   const params = {
      TableName: 'Pedido',
      Item: {
         ...pedido
      },
   };

   try {
      // await dao.adicionar(params)
      // await enviar_email(pedido, reservas, usuario)
      const url_checkout = await finalizar_compra(pedido)
      return url_checkout
   } catch (error) {
      throw new Error(error)
   }
}