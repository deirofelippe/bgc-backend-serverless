const dao = require('../dao/pedido_dao');

module.exports.buscar = async (event) => {
   const params = {
      TableName: 'Pedido',
      Key: {
         "numero_pedido": "00"
      }
   };

   const r = await dao.buscar(params)
   console.log(r)
   return
}