const express = require('express');
const professor = express.Router();
const conexao = require('../../mysqlConnect');

const contador = 23; // incremento na chave

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
    let query = `SELECT chave_professor FROM sact2021.chaves WHERE id = 1`;
    conexao.query(query, function(error, results){
        if(error){ 
            console.log(error);
        }else{
            let chave = parseInt(results[0].chave_professor) + contador;
            res.json({"chave":chave});
        }
    });
}


//envia a chave para o sistema
professor.get('/pegaChave', (req, res)=>{
    pegaChave(res);
})
//depois de salvar atualiza a chave no banco
professor.post('/atualizaChave', (req, res)=>{
    let novaChave = req.body.novaChave;
    let update = `UPDATE sact2021.chaves SET chave_professor = '${novaChave}' WHERE (id = '1')`;
    executaSql(update, res);
})


//lista todos avaliadores
professor.get('/todos-professores', (req, res)=>{
    let query = `SELECT * FROM sact2021.professor`;
    executaSql(query, res);
})

//lista todos professores de um curso  // info | eletro | meca
professor.get('/todos/:curso', (req, res)=>{
    let curso = req.params.curso;
    let query = `SELECT * FROM sact2021.professor WHERE (curso = '${curso}')`;
    executaSql(query, res);
})

//cadastra um avaliador
professor.post('/cadastra-professor', (req, res)=>{
    let chave = parseInt(req.body.chave);
    let nome = req.body.nome;
    let curso = req.body.curso;
    let query = `INSERT INTO sact2021.professor (chave, nome, curso, qtd_projetos, qtd_avaliacoes) VALUES ('${chave}','${nome}', '${curso}', '0', '0')`;
    executaSql(query, res);
})

//retorna quantidade de avaliadores cadastrados
professor.get('/cont', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.professor`;
    executaSql(query, res);
})

//excluir avaliador
professor.get('/excluir/:chave', (req, res)=>{
    let chave = req.params.chave;
    let query = `DELETE FROM sact2021.professor WHERE (chave = '${chave}')`;
    executaSql(query, res);
})

//busca projetos por professor
professor.get('/projetos/:professor', (req, res)=>{
    let professor = req.params.professor;
    let query = `SELECT * FROM sact2021.projetos WHERE (professor = '${professor}')`;
    executaSql(query, res);
})

//professor avaliar projeto
professor.post('/avaliar', (req, res)=>{
    let chave = req.body.chave;
    let nota = req.body.nota;
    let update = `UPDATE sact2021.projetos SET nota_professor = '${nota}' WHERE (chave = '${chave}')`;
    executaSql(update, res);
})

module.exports = professor;