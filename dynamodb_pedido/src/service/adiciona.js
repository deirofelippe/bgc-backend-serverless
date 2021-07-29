const dao = require('../dao/pedidoDAO');
const uuid = require('uuid');
const { finalizarCompra } = require('../pagamento/pagseguro');
const { enviarEmail } = require('../email');

module.exports.adicionar = async novoPedido => {
   const { pedidoResumido, pedidoComDetalhes } = await montarPedido(novoPedido)

   await dao.adicionar(pedidoResumido)
   await enviarEmail(pedidoComDetalhes)
   const urlCheckout = await finalizarCompra(pedidoComDetalhes)

   return urlCheckout
}

const montarPedido = async pedido => {
   const dataPedido = Date.now()
   const numeroPedido = uuid.v1()

   const itensComDetalhes = await Promise.all(pedido.itens.map(montarItensComDetalhes))
   const itensResumidos = itensComDetalhes.map(montarItensResumidos)
   const total = itensComDetalhes.reduce(calcularTotal, 0)
   const { Item: usuario } = await dao.buscarUsuarioDoPedido(pedido.idUsuario)

   return {
      pedidoComDetalhes: {
         numeroPedido,
         dataPedido,
         total,
         usuario,
         itens: itensComDetalhes
      },
      pedidoResumido: {
         numeroPedido,
         dataPedido,
         total,
         idUsuario: usuario.id,
         itens: itensResumidos
      }
   }
}

const calcularTotal = (total, { preco, quantidade }) => {
   return parseFloat(total) + (parseFloat(preco) * parseInt(quantidade))
}

const montarItensComDetalhes = async item => {
   const { Item: itemBuscado } = await dao.buscarItem(item.id)
   return {
      ...itemBuscado,
      quantidade: item.quantidade
   }
}

const montarItensResumidos = item => {
   return {
      id: item.id,
      quantidade: item.quantidade
   }
}