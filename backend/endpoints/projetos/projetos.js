const express = require('express');
const projetos = express.Router();
const conexao = require('../../mysqlConnect');

const contador = 27; // incremento na chave

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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function pegaChave(res){
    let query = `SELECT chave_projeto FROM sact2021.chaves WHERE id = 1`;
    conexao.query(query, function(error, results){
        if(error){ 
            console.log(error);
        }else{
            let chave = parseInt(results[0].chave_projeto) + getRandomInt(1,50);
            console.log("chave de projeto gerada: " + chave);
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
    let dados = [req.body.novaChave];
    let update = `UPDATE sact2021.chaves SET chave_projeto = ? WHERE (id = '1')`;
    executaSql(update,dados, res);
})

//busca projeto por chave
projetos.get('/buscar/:chave', (req, res)=>{
    let dados = [req.params.chave];
    let query = `SELECT * FROM sact2021.projetos WHERE (chave = ?)`;
    executaSql(query,dados, res);
})


//lista todos projetos
projetos.get('/todos', (req, res)=>{
    let query = `SELECT * FROM sact2021.projetos`;
    let dados = [];
    executaSql(query, dados,res);
})

//projetos ordenados por qtd avaliacoes
projetos.get('/avaliacoes-realizadas', (req, res)=>{
    let query = `SELECT * FROM sact2021.projetos ORDER BY qtd_avaliacoes DESC`;
    let dados = [];
    executaSql(query, dados,res);
})

//projetos ordenados por avaliacao
projetos.get('/ranking-geral', (req, res)=>{
    let query = `SELECT * FROM sact2021.projetos ORDER BY nota_final DESC`;
    let dados = [];
    executaSql(query, dados,res);
})

//lista todos projetos de um curso  // info | eletro | meca
projetos.get('/todos/:curso', (req, res)=>{
    let query = `SELECT * FROM sact2021.projetos WHERE (curso = ?)`;
    let dados = [req.params.curso];
    executaSql(query, dados,res);
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
    let professor = req.body.professor;
    let curso = req.body.curso;

    let query = "INSERT INTO sact2021.projetos (chave, nome, turma, curso, descricao, aluno1, aluno2, aluno3, aluno4, professor, nota_professor) VALUES (?,?,?,?,?,?,?,?,?,?,'0')";
    let dados = [chave, nome, turma, curso, descricao, aluno1, aluno2, aluno3, aluno4, professor];
    executaSql(query, dados,res);
})

//retorna quantidade de projetos cadastrados
projetos.get('/cont', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.projetos`;
    let dados = [];
    executaSql(query, dados,res);
})

//contagem de projetos por curso
projetos.get('/cont/:curso', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.projetos WHERE (curso = ?)`;
    let dados = [req.params.curso];
    executaSql(query, dados,res);
})

//excluir projetos
projetos.get('/excluir/:chave', (req, res)=>{
    let query = `DELETE FROM sact2021.projetos WHERE (chave = ?)`;
    let dados = [req.params.chave];
    executaSql(query, dados,res);
})

module.exports = projetos;