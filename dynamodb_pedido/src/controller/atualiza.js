const dao = require('../dao/pedido_dao');

module.exports.atualizar = async (event) => {
   const { pedido } = JSON.parse(event.body);
   const numero_pedido = event.pathParameters.id
   const reservas = pedido.reservas
   const usuario = pedido.usuario
   
   const params = {
      TableName: 'Pedido',
      Key: {
         "numero_pedido": "00"
      },
      UpdateExpression: "set data_pedido = :data_pedido, #total = :total, reservas = :reservas",
      ExpressionAttributeValues:{
         ":total": 1,
         ":data_pedido": 1,
      },
      ExpressionAttributeNames: {
         "#total": "total"
      },
      ReturnValues:"ALL_NEW"
   };

   const r = await dao.atualizar(params)
   console.log(r)
   return response
}