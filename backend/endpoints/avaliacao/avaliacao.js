const express = require('express');
const avaliacao = express.Router();
const conexao = require('../../mysqlConnect');

function executaSql(query, res){ // executa a query e responde
    conexao.query(query, function(error, results){
        if(error){ 
            res.json(error);
            console.log(error);
        }else{
            res.json(results);
        }
    });
}

//busca um projeto para avaliar
avaliacao.get('/select-projeto/:chave', (req, res)=>{
    let chave = req.params.chave;
    let query = `SELECT * FROM sact2021.projetos WHERE (chave = '${chave}')`;
    executaSql(query, res);
})



//lista todas avaliacoes
avaliacao.get('/todos', (req, res)=>{
    let query = `SELECT * FROM sact2021.avaliacoes`;
    executaSql(query, res);
})

//log de avaliacoes
avaliacao.get('/avaliacoes-log', (req, res)=>{
    let query = `SELECT * FROM sact2021.avaliacoes ORDER BY id DESC`;
    executaSql(query, res);
})

//lista todos avaliacoes de um curso  // info | eletro | meca
avaliacao.get('/todos/:curso', (req, res)=>{
    let curso = req.params.curso;
    let query = `SELECT * FROM sact2021.avaliacoes WHERE (curso = '${curso}')`;
    executaSql(query, res);
})

//lista todos avaliacoes de um projeto  
avaliacao.get('/projeto/:chave', (req, res)=>{
    let chave = req.params.chave;
    let query = `SELECT * FROM sact2021.avaliacoes WHERE (chave_projeto = '${chave}')`;
    executaSql(query, res);
})

//lista todos avaliacoes de um avaliador  
avaliacao.get('/avaliador/:chave', (req, res)=>{
    let chave = req.params.chave;
    let query = `SELECT * FROM sact2021.avaliacoes WHERE (chave_avaliador = '${chave}')`;
    executaSql(query, res);
})

//cadastra uma avaliacao
avaliacao.post('/avaliar', (req, res)=>{
    let chave_projeto = parseInt(req.body.chave_projeto);
    let nome_projeto = req.body.nome_projeto;
    let chave_avaliador = parseInt(req.body.chave_avaliador);
    let nome_avaliador = req.body.nome_avaliador;
    let tipo_avaliador = req.body.tipo_avaliador;
    let nota = parseFloat(req.body.nota);
    let hora = req.body.hora;
    let turma = req.body.turma;
    let curso = req.body.curso;

    let query = `INSERT INTO sact2021.avaliacoes (chave_projeto, chave_avaliador, nome_projeto, nome_avaliador, tipo_avaliador, nota, hora_avaliacao, curso, turma) VALUES ('${chave_projeto}','${chave_avaliador}', '${nome_projeto}', '${nome_avaliador}', '${tipo_avaliador}','${nota}','${hora}','${curso}','${turma}')`;
    executaSql(query, res);
})

//atualiza a nota e quantidade no projeto
avaliacao.post('/atualiza-nota-projeto/:chave', (req, res)=>{
    let chave = req.params.chave;
    let n1 = req.body.n1;
    let n2 = req.body.n2;
    let n3 = req.body.n3;
    let n4 = req.body.n4;
    let qtd = req.body.qtd_avaliacoes;
    let nota_final = req.body.nota_final;
    let query = `UPDATE sact2021.projetos SET n1 = '${n1}', n2 = '${n2}', n3 = '${n3}', n4 = '${n4}', qtd_avaliacoes = '${qtd}', nota_final = '${nota_final}' WHERE (chave = '${chave}')`;
    executaSql(query, res);
})


//atualiza a e quantidade de projetos avaliador
avaliacao.post('/atualiza-qtd-projetos/:chave', (req, res)=>{
    let chave = req.params.chave;
    let qtd = req.body.qtd_avaliacoes;
    let query = `UPDATE sact2021.avaliador SET projetos_avaliados = '${qtd}' WHERE (chave = '${chave}')`;
    executaSql(query, res);
})

//retorna quantidade de avaliacoes cadastrados
avaliacao.get('/cont', (req, res)=>{
    let query = `SELECT COUNT(*) AS cont FROM sact2021.avaliacoes`;
    executaSql(query, res);
})

//contagem de avaliacoes por projeto
avaliacao.get('/cont-avaliacoes/:chave', (req, res)=>{
    let chave = req.params.chave;
    let query = `SELECT qtd_avaliacoes AS cont FROM sact2021.projetos WHERE (chave = '${chave}')`;
    executaSql(query, res);
})

//contagem de avaliacoes por curso
avaliacao.get('/cont/:curso', (req, res)=>{
    let curso = req.params.curso;
    let query = `SELECT COUNT(*) AS cont FROM sact2021.avaliacoes WHERE (curso = '${curso}')`;
    executaSql(query, res);
})


module.exports = avaliacao;