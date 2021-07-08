const { adicionar } = require('./controller/adiciona');
const { listar } = require('./controller/lista');
const { buscar } = require('./controller/busca');
const { atualizar } = require('./controller/atualiza');
const { deletar } = require('./controller/deleta');

module.exports = {
   adicionar: adicionar,
   listar: listar,
   buscar: buscar,
   atualizar: atualizar,
   deletar: deletar,
}