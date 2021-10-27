const express = require('express');
const auth = express.Router();
const conexao = require('../../mysqlConnect');


auth.post('/admin-login', (req, res)=>{
    let chave = req.body.chave;

    let queryUser = `SELECT * FROM sact2021.admin WHERE(chave='${chave}')`
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    conexao.query(queryUser, function(error, results){
        if(error){ 
            res.send(null);
        }else{
            if(results.length > 0){
                res.send(token);
                console.log('admin reslizou a operação o Login');
            }else{
                res.send(null);
            }
        }
    });
})

module.exports = auth;