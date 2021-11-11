const express = require('express');
const cors = require('cors');
const app = express();

/*const https = require('https');
const path = require('path');
const fs = require('fs');*/

const port = 8080;

const rotas = require('./endpoints/rotas');

app.use(express.json());
app.use(cors());

app.use(rotas);




app.listen(port, ()=>{
    console.log("servidor online na porta 8080");
})


/*const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'certificado', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'certificado', 'cert.pem')),
    },
    app 
)

sslServer.listen(port, ()=>{
    console.log("server seguro online na porta 3443");
})*/
