const express = require('express');
const avaliador = express.Router();
const conexao = require('../../mysqlConnect');

const contador = 21; // incremento na chave

function executaSql(query, res){ // executa a query e responde
    conexao.query(query, function(error, results){
        if(error){ 
            res.json(error);
        }else{
            res.json(results);
        }
    });
}

function pegaChave(res){
    let query = `SELECT chave_avaliador FROM sact2021.chaves WHERE id = 1`;
    conexao.query(query, function(error, results){
        if(error){ 
            console.log(error);
        }else{
            let chave = parseInt(results[0].chave_avaliador) + contador;
            res.json({"chave":chave});
        }
    });
}


//envia a chave para o sistema
avaliador.get('/pegaChave', (req, res)=>{
    pegaChave(res);
})
//depois de salvar atualiza a chave no banco
avaliador.post('/atualizaChave', (req, res)=>{
    let novaChave = req.body.novaChave;
    let update = `UPDATE sact2021.chaves SET chave_avaliador = '${novaChave}' WHERE (id = '1')`;
    executaSql(update, res);
})


//lista todos avaliadores
avaliador.get('/todos-avaliadores', (req, res)=>{
    let query = `SELECT * FROM sact2021.avaliador`;
    executaSql(query, res);
})
//cadastra um avaliador
avaliador.post('/cadastra-avaliador', (req, res)=>{
    let chave = parseInt(req.body.chave);
    let nome = req.body.nome;
    let inst = req.body.instituicao;
    let query = `INSERT INTO sact2021.avaliador (chave, nome, instituicao, projetos_avaliados) VALUES ('${chave}','${nome}', '${inst}', '0')`;
    executaSql(query, res);
})

//retorna quantidade de avaliadores cadastrados
avaliador.get('/cont', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.avaliador`;
    executaSql(query, res);
})

//excluir avaliador
avaliador.get('/excluir/:chave', (req, res)=>{
    let chave = req.params.chave;
    let query = `DELETE FROM sact2021.avaliador WHERE (chave = '${chave}')`;
    executaSql(query, res);
})

module.exports = avaliador;