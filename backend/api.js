const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const rotas = require('./endpoints/rotas');

app.use(express.json());
app.use(cors());

app.use(rotas);

app.listen(port, ()=>{
    console.log("servidor online na porta 8080");
})


