const express = require('express');
const rotas = express.Router();

//modulos endpoints
const avaliador = require('./avaliador/avaliador');

//rotas
rotas.use('/avaliador', avaliador );


module.exports = rotas;