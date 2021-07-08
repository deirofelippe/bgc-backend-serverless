const { gerar_corpo_email } = require('./corpo_email');
const nodemailer = require('nodemailer');
const variaveis = require('../../variaveis');

module.exports.enviar_email = async (pedido, reservas, usuario) => {
   const html = gerar_corpo_email(pedido, reservas, usuario)

   const mailOptions = {
      from: variaveis.MAIL_SENDER,
      subject: "Reserva feita!",
      html: html,
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