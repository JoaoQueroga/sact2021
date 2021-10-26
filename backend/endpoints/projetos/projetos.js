const express = require('express');
const projetos = express.Router();
const conexao = require('../../mysqlConnect');

const contador = 27; // incremento na chave

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
    let query = `SELECT chave_projeto FROM sact2021.chaves WHERE id = 1`;
    conexao.query(query, function(error, results){
        if(error){ 
            console.log(error);
        }else{
            let chave = parseInt(results[0].chave_projeto) + contador;
            res.json({"chave":chave});
        }
    });
}


//envia a chave para o sistema
projetos.get('/pegaChave', (req, res)=>{
    pegaChave(res);
})
//depois de salvar atualiza a chave no banco
projetos.post('/atualizaChave', (req, res)=>{
    let novaChave = req.body.novaChave;
    let update = `UPDATE sact2021.chaves SET chave_projeto = '${novaChave}' WHERE (id = '1')`;
    executaSql(update, res);
})


//lista todos projetos
projetos.get('/todos', (req, res)=>{
    let query = `SELECT * FROM sact2021.projetos`;
    executaSql(query, res);
})

//lista todos projetos de um curso  // info | eletro | meca
projetos.get('/todos/:curso', (req, res)=>{
    let curso = req.params.curso;
    let query = `SELECT * FROM sact2021.projetos WHERE (curso = '${curso}')`;
    executaSql(query, res);
})


//cadastra um projetos
projetos.post('/cadastra-projeto', (req, res)=>{
    let chave = parseInt(req.body.chave);
    let nome = req.body.nome;
    let turma = req.body.turma;
    let descricao = req.body.descricao;
    let aluno1 = req.body.aluno1;
    let aluno2 = req.body.aluno2;
    let aluno3 = req.body.aluno3;
    let aluno4 = req.body.aluno4;
    let curso = req.body.curso;

    let query = `INSERT INTO sact2021.projetos (chave, nome, turma, curso, descricao, aluno1, aluno2, aluno3, aluno4, professor, nota_professor, nota_avaliador, qtd_avaliacoes) VALUES ('${chave}','${nome}', '${turma}', '${curso}', '${descricao}','${aluno1}','${aluno2}','${aluno3}','${aluno4}','','0','0','0')`;
    executaSql(query, res);
})

//retorna quantidade de projetos cadastrados
projetos.get('/cont', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.projetos`;
    executaSql(query, res);
})

//contagem de projetos por curso
projetos.get('/cont/:curso', (req, res)=>{
    let curso = req.params.curso;
    let query = `SELECT COUNT(*) AS cont FROM sact2021.projetos WHERE (curso = '${curso}')`;
    executaSql(query, res);
})

//excluir projetos
projetos.get('/excluir/:chave', (req, res)=>{
    let chave = req.params.chave;
    let query = `DELETE FROM sact2021.projetos WHERE (chave = '${chave}')`;
    executaSql(query, res);
})

module.exports = projetos;