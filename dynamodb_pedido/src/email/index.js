const { gerarCorpoXML } = require('./corpoEmail');
const nodemailer = require('nodemailer');
const variaveis = require('../../variaveis');

module.exports.enviarEmail = async pedido => {
   const { usuario } = pedido

   const xml = gerarCorpoXML(pedido)

   const mailOptions = {
      from: variaveis.MAIL_SENDER,
      subject: "Reserva feita!",
      html: xml,
      to: `${usuario.email}, ${variaveis.MAIL_USER}`,
   };

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
         user: variaveis.MAIL_USER,
         pass: variaveis.MAIL_PASSWORD
      }
   });

   await transporter.sendMail(mailOptions)
}