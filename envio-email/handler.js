'use strict';

var aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const variaveis = require('./variaveis');

// var ses = new aws.SES({ region: 'sa-east-1' });
var ses = new aws.SES();

module.exports.enviarEmail = async (event) => {
   let { nome, preco, email } = JSON.parse(event.body);

   console.log(event.body)
   console.log(email)

   const formatter = new Intl.NumberFormat('pt-BR', 
      { style: 'currency', currency: 'BRL' }
   );

   preco = formatter.format(preco)

   var mailOptions = {
      from: variaveis.MAIL_SENDER,
      subject: "Reserva feita!",
      html: `<p>Foi feita a reserva do produto ${nome} como valor de ${preco}</p>`,
      to: email,
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
      res.body = JSON.stringify({ msg: `Email enviado para ${email}` })

      return res
   } catch (error) {
      console.log(error)

      res.statusCode = 500
      res.body = JSON.stringify({ msg: "Falha no envio de email." })

      return res
   }
};