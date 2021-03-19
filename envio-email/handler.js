'use strict';

const nodemailer = require('nodemailer');
const variaveis = require('./variaveis');

module.exports.enviarEmail = async (event) => {
   const { pedido } = JSON.parse(event.body);
   const reservas = pedido.reservas
   const usuario = pedido.usuario

   const html = gerar_html(pedido, reservas, usuario)

   console.log(html)

   var mailOptions = {
      from: variaveis.MAIL_SENDER,
      subject: "Reserva feita!",
      html: html,
      to: usuario.email,
   };

   var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
         user: variaveis.MAIL_USER,
         pass: variaveis.MAIL_PASSWORD
      }
   });

   let res = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: ""
   }

   try {
      await transporter.sendMail(mailOptions)

      res.statusCode = 200
      res.body = JSON.stringify({ msg: `Email enviado!` })

      return res
   } catch (error) {
      console.log(error)

      res.statusCode = 500
      res.body = JSON.stringify({ msg: "Falha no envio de email." })

      return res
   }
};

const formatar_data = data => {
   data = new Date(data)
   return `${data.getDay()}/${data.getMonth()}/${data.getFullYear()} às ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
}

const formatar_valor = valor => {
   const formatter = new Intl.NumberFormat('pt-BR', 
      { style: 'currency', currency: 'BRL' }
   );

   return formatter.format(valor)
}


const gerar_html = (pedido, reservas, usuario) => {
   let html = `
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
      
      <p>Número do pedido: ${pedido.numero_pedido}</p></br>
      <p>Data do pedido: ${formatar_data(pedido.data_pedido)}</p></br>
      <p>Total: ${formatar_valor(pedido.total)}</p></br>
      
      <table>
         <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
         </tr>
   `

   reservas.forEach(produto => {
   const subtotal = formatar_valor(produto.preco * produto.quantidade)
   html += `
      <tr>
         <td>${produto.nome}</td>
         <td>${produto.descricao}</td>
         <td>${formatar_valor(produto.preco)}</td>
         <td>${produto.quantidade}</td>
         <td>${subtotal}</td>
      </tr>
   `
   })

   html += `
         </table>
      </body>
      </html>
   `
   return html
}
   
