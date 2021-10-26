const express = require('express');
const rotas = express.Router();

//modulos endpoints
const avaliador = require('./avaliador/avaliador');
const projetos =  require('./projetos/projetos');
const auth = require('./auth/auth');

//rotas
rotas.use('/avaliador', avaliador );
rotas.use('/projetos', projetos );
rotas.use('/auth', auth);


module.exports = rotas;