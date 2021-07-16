const dao = require('../dao/produto_dao');
const uuid = require('uuid');
// const formidable = require('formidable');

module.exports.adicionar = async (event, context) => {
   const produto = JSON.parse(event.body);
   // const form = new formidable.IncomingForm()
   // const result = await form.parse(event.body)

   const params = {
      TableName: process.env.tabelaProduto,
      Item: {
         id: uuid.v1(),
         // id: '01',
         nome: produto.nome, 
         descricao: produto.descricao,
         preco: produto.preco,
         imagem: '',
         createdAt: Date.now(),
      },
   };

   let response = {
      statusCode: 0,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true,
      },
      body: ''
   }

   try {
      await dao.adicionar(params)

      response.statusCode = 201
   } catch (error) {
      console.log(error)

      response.statusCode = 500
      response.body = JSON.stringify({ msg: 'Falha em algo.' })
   }

   return response
}