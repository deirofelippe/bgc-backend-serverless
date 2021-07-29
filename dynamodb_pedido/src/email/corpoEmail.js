module.exports.gerarCorpoXML = pedido => {
   const { usuario, itens } = pedido
   let { total, dataPedido } = pedido

   total = formatarValor(total)
   dataPedido = formatarData(dataPedido)

   let subtotal = 0, preco = 0
   let tableBody = ``

   itens.forEach(item => {
      subtotal = formatarValor(parseFloat(item.preco) * parseInt(item.quantidade))
      preco = formatarValor(item.preco)

      tableBody += `
         <tr>
            <td>${item.nome}</td>
            <td>${item.descricao}</td>
            <td>${preco}</td>
            <td>${item.quantidade}</td>
            <td>${subtotal}</td>
         </tr>
      `
   })

   const xml = `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
         <meta charset="UTF-8"/>
         <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
         <style>
            table {
               font-family: arial, sans-serif;
               border-collapse: collapse;
               width: 100%;
            }
            
            td, th {
               border: 1px solid #dddddd;
               text-align: left;
               padding: 8px;
            }
            
            tr:nth-child(even) {
               background-color: #dddddd;
            }
         </style>
      </head>
      <body>
         <h1>Olá ${usuario.nome}, sua reserva foi feita!</h1></br>
         <h2>Segue abaixo os dados de sua reserva.</h2></br>
         
         <p>Número do pedido: ${pedido.numeroPedido}</p></br>
         <p>Data do pedido: ${dataPedido}</p></br>
         <p>Total: ${total}</p></br>
         
         <table>
            <tr>
               <th>Nome</th>
               <th>Descrição</th>
               <th>Preço</th>
               <th>Quantidade</th>
               <th>Subtotal</th>
            </tr>
            ${tableBody}
         </table>
      </body>
      </html>
   `

   return xml
}

const formatarData = data => {
   data = new Date(data)
   return `${data.getDay()}/${data.getMonth()}/${data.getFullYear()} às ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
}

const formatarValor = valor => {
   const formatter = new Intl.NumberFormat('pt-BR', 
      { style: 'currency', currency: 'BRL' }
   );

   return formatter.format(valor)
}