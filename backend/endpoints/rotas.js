const express = require('express');
const rotas = express.Router();

//modulos endpoints
const avaliador = require('./avaliador/avaliador');
const projetos =  require('./projetos/projetos');

//rotas
rotas.use('/avaliador', avaliador );
rotas.use('/projetos', projetos );


module.exports = rotas;