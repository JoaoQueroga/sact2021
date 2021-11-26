const express = require('express');
const criterios = express.Router();
const conexao = require('../../mysqlConnect');

function executaSql(query, dados , res){ // executa a query e responde
    conexao.query(query, dados ,function(error, results){
        if(error){ 
            res.json(error);
            console.log(error);
        }else{
            res.json(results);
        }
    });
}


//lista todos criterios
criterios.get('/todos-criterios', (req, res)=>{
    let query = `SELECT * FROM sact2021.criterios`;
    executaSql(query, res);
})

//lista todos projetos de um curso  // info | eletro | meca
criterios.get('/todos/:curso', (req, res)=>{
    let query = `SELECT * FROM sact2021.criterios WHERE (curso = ?)`;
    let dados = [req.params.curso]
    executaSql(query,dados, res);
})

//cadastra um criterios
criterios.post('/cadastra-criterio', (req, res)=>{
    let criterio = req.body.criterio;
    let peso = parseFloat(req.body.peso);
    let curso = req.body.curso;
    let query = `INSERT INTO sact2021.criterios (criterio, peso, curso) VALUES (?,?,?)`;
    let dados = [criterio, peso, curso];
    executaSql(query,dados, res);
})

//retorna quantidade de criterios cadastrados
criterios.get('/cont', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.criterios`;
    let dados = []
    executaSql(query,dados, res);
})

//contagem de criterios por curso
criterios.get('/cont/:curso', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.criterios WHERE (curso = ?)`;
    let dados = [req.params.curso]
    executaSql(query,dados, res);
})

//excluir criterios
criterios.get('/excluir/:id', (req, res)=>{
    let query = `DELETE FROM sact2021.criterios WHERE (id = ?)`;
    let dados = [req.params.id]
    executaSql(query,dados, res);
})

module.exports = criterios;