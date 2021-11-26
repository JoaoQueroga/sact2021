const express = require('express');
const avaliacao = express.Router();
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

//busca um projeto para avaliar
avaliacao.get('/select-projeto/:chave', (req, res)=>{
    let chave = req.params.chave;
    let sql = "SELECT * FROM sact2021.projetos WHERE (chave = ?)";
    let dados = [chave];
    executaSql(sql, dados , res);
})

//função para calcular nota dos projetos
function buscaProjetos(){
    return new Promise((resolve, reject)=>{
        let sql = `SELECT * FROM sact2021.projetos`;
        conexao.query(sql ,function(error, results){
            if(error){
                reject(error);
            }else{
                resolve(results);
            }
        })
    })
}

async function buscaNotas(p){ // monta a resposta
    return new Promise((resolve)=>{
    
        let sql = "SELECT * FROM sact2021.avaliacoes WHERE (chave_projeto = ?)";
        conexao.query(sql , p.chave ,function(error, results){
            let media = p.nota_professor;
            let notas = [p.nota_professor];

            results.map((av)=>{
                notas.push(av.nota);
                media += av.nota;
            })
        
            media = media/(results.length+1);
            
            let proj = {
                "chave":p.chave,
                "projeto": p.nome,
                "curso": p.curso,
                "turma": p.turma,
                "notas": notas,
                "media": media,
                "qtd_avaliacoes": notas.length
            }

            resolve(proj);
        })
    })
}

async function calculaNotas(res){
   
    let projetos = await buscaProjetos(); // busca os projetos async

    let dados = [];  // array de dados 
    let cont = 0; // contador para encontrar o ultimo
    projetos.map((p)=>{ // percorre os projetos encontrados
        let notaProjeto =  buscaNotas(p); // busca as notas deste projeto
        notaProjeto.then((projeto)=>{ // quando chegar 
            cont++; // achou + 1
            dados.push(projeto); // adiciona no array de dados
            if(projetos.length === cont){ // no ultimo projeto retorna tudo
                res.send(dados); // retorna os dados no ultimo
            }
        })
    })
}


//RAKING
avaliacao.get('/ranking', (req, res)=>{
    let sql = `SELECT chave FROM sact2021.projetos`;
    calculaNotas(res); // chama a função assync para gerar notas
})


//lista todas avaliacoes
avaliacao.get('/todos', (req, res)=>{
    let dados = [];
    let sql = `SELECT * FROM sact2021.avaliacoes`;
    executaSql(sql,dados, res);
})

//log de avaliacoes
avaliacao.get('/avaliacoes-log', (req, res)=>{
    let dados = [];
    let sql = `SELECT * FROM sact2021.avaliacoes ORDER BY id DESC`;
    executaSql(sql,dados, res);
})

//lista todos avaliacoes de um curso  // info | eletro | meca
avaliacao.get('/todos/:curso', (req, res)=>{
    let dados = [req.params.curso];
    let sql = "SELECT * FROM sact2021.avaliacoes WHERE (curso = ?)";
    executaSql(sql,dados, res);
})

//lista todos avaliacoes de um projeto  
avaliacao.get('/projeto/:chave', (req, res)=>{
    let dados = [req.params.chave];
    let sql = "SELECT * FROM sact2021.avaliacoes WHERE (chave_projeto = ?)";
    executaSql(sql,dados, res);
})

//lista todos avaliacoes de um avaliador  
avaliacao.get('/avaliador/:chave', (req, res)=>{
    let dados = [req.params.chave];
    let sql = "SELECT * FROM sact2021.avaliacoes WHERE (chave_avaliador = ?)";
    executaSql(sql,dados, res);
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

    let dados = [chave_projeto, chave_avaliador , nome_projeto, nome_avaliador, tipo_avaliador, nota, hora, curso, turma];

    let sql = "INSERT INTO sact2021.avaliacoes (chave_projeto, chave_avaliador, nome_projeto, nome_avaliador, tipo_avaliador, nota, hora_avaliacao, curso, turma) VALUES (?,?,?,?,?,?,?,?,?)";
    console.log("avaliado por " + nome_avaliador);
    executaSql(sql,dados, res);
})

//avaliacao/professor/
avaliacao.post('/professor/:chave', (req, res)=>{
    let chave = req.params.chave;
    let nota_professor = req.body.nota_professor;
    let dados = [ nota_professor, chave];
    let sql = "UPDATE sact2021.projetos SET nota_professor = ? WHERE (chave = ?)";
    executaSql(sql,dados, res);
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
    let dados = [];
    let sql = `UPDATE sact2021.projetos SET n1 = '${n1}', n2 = '${n2}', n3 = '${n3}', n4 = '${n4}', qtd_avaliacoes = '${qtd}', nota_final = '${nota_final}' WHERE (chave = '${chave}')`;
    executaSql(sql,dados, res);
})


//atualiza a e quantidade de projetos avaliador
avaliacao.post('/atualiza-qtd-projetos/:chave', (req, res)=>{
    let dados = [req.body.qtd_avaliacoes, req.params.chave];
    let sql = "UPDATE sact2021.avaliador SET projetos_avaliados = ? WHERE (chave = ?)";
    executaSql(sql,dados, res);
})

//retorna quantidade de avaliacoes cadastrados
avaliacao.get('/cont', (req, res)=>{
    let dados = [];
    let sql = `SELECT COUNT(*) AS cont FROM sact2021.avaliacoes`;
    executaSql(sql,dados, res);
})

//contagem de avaliacoes por projeto
avaliacao.get('/cont-avaliacoes/:chave', (req, res)=>{
    let dados = [req.params.chave];
    let sql = "SELECT qtd_avaliacoes AS cont FROM sact2021.projetos WHERE (chave = ?)";
    executaSql(sql,dados, res);
})

//contagem de avaliacoes por curso
avaliacao.get('/cont/:curso', (req, res)=>{
    let dados = [req.params.curso];
    let sql = "SELECT COUNT (*) AS cont FROM sact2021.avaliacoes WHERE (curso = ?)";
    executaSql(sql,dados, res);
})


module.exports = avaliacao;