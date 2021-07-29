const dao = require('../dao/pedidoDAO');

module.exports.listar = async idUsuario => {
   const { Count: count, Items: pedidosResumidos } = await dao.listarPedidosDoUsuario(idUsuario)

   const pedidos = await Promise.all(pedidosResumidos.map(montarPedidos))

   return {
      count,
      pedidos
   }
}

const montarPedidos = async pedido => {
   itens = await Promise.all(pedido.itens.map(montarItens))

   return {
      numeroPedido: pedido.numeroPedido,
      total: pedido.total,
      dataPedido: pedido.dataPedido,
      itens
   }
}

const montarItens = async item => {
   const { Item: produto } = await dao.buscarItem(item.id)

   return {
      ...produto,
      quantidade: item.quantidade
   }
}