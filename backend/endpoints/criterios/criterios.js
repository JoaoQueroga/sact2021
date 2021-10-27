const express = require('express');
const criterios = express.Router();
const conexao = require('../../mysqlConnect');


function executaSql(query, res){ // executa a query e responde
    conexao.query(query, function(error, results){
        if(error){ 
            res.json(error);
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
    let curso = req.params.curso;
    let query = `SELECT * FROM sact2021.criterios WHERE (curso = '${curso}')`;
    executaSql(query, res);
})

//cadastra um criterios
criterios.post('/cadastra-criterio', (req, res)=>{
    let criterio = req.body.criterio;
    let peso = parseFloat(req.body.peso);
    let curso = req.body.curso;
    let query = `INSERT INTO sact2021.criterios (criterio, peso, curso) VALUES ('${criterio}','${peso}', '${curso}')`;
    executaSql(query, res);
})

//retorna quantidade de criterios cadastrados
criterios.get('/cont', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.criterios`;
    executaSql(query, res);
})

//contagem de criterios por curso
criterios.get('/cont/:curso', (req, res)=>{
    let curso = req.params.curso;
    let query = `SELECT COUNT(*) AS cont FROM sact2021.criterios WHERE (curso = '${curso}')`;
    executaSql(query, res);
})

//excluir criterios
criterios.get('/excluir/:id', (req, res)=>{
    let id = req.params.id;
    let query = `DELETE FROM sact2021.criterios WHERE (id = '${id}')`;
    executaSql(query, res);
})

module.exports = criterios;