const express = require('express');
const rotas = express.Router();

//modulos endpoints
const avaliador = require('./avaliador/avaliador');
const projetos =  require('./projetos/projetos');
const professor = require('./professor/professor');
const criterios = require('./criterios/criterios');
const avaliacao = require('./avaliacao/avaliacao');
const auth = require('./auth/auth');



//rotas
rotas.use('/avaliador', avaliador );
rotas.use('/projetos', projetos );
rotas.use('/professor', professor);
rotas.use('/criterios', criterios);
rotas.use('/avaliacao', avaliacao);
rotas.use('/auth', auth);


module.exports = rotas;