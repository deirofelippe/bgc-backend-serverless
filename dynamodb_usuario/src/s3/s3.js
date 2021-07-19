const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = {
   async get(){
      const params = {
         Bucket: bucket,
         Key: nomeImagem,
      };
      const obj = await s3.getObject(params).promise()
   },
   async put(){
      const params = {
         Bucket: process.env.nomeBucket,
         Key: nomeImagem,
         Body: imagem,
      };
      await s3.putObject(params).promise()
   },
}