const express = require('express');
const app = express();
const cors = require('cors'); // Essencial para permitir a conversa entre domínios diferentes
const mysql = require('mysql2');
require('dotenv').config(); // Carrega as variáveis do .env

app.use(cors());
app.use(express.json());
console.log(process.env.DB_NAME);
const db = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_Usuario,
    password: process.env.DB_senha,
    database: process.env.DB_TABELA,
    waitForConnections: true,
    connectionLimit: 10, // Quantidade máxima de conexões simultâneas
    queueLimit: 0
});



// Rota de Consulta (Cria a ponte de retorno)
// Rota para buscar produtos de mercearia
app.get('/produtos', (req, res) => {
    db.query("SELECT descricao, quantidade, valor FROM produtos WHERE secao = 'mercearia'", (err, result) => {
        if (err) return res.status(500).send('Erro ao buscar');
        res.json(result);
    });
});

// Rota para buscar produtos de DPH (usando a coluna 'secao' que está no seu Workbench)
app.get('/dph', (req, res) => {
    db.query("SELECT descricao, quantidade, valor FROM produtos WHERE secao = 'dph'", (err, result) => {
        if (err) return res.status(500).send('Erro ao buscar');
        res.json(result);
    });
});
app.get('/laticinios', (req, res) => {
    db.query("SELECT descricao, quantidade, valor FROM produtos WHERE secao LIKE '%laticin%' OR secao LIKE '%Laticínios%'", (err, result) => {
        if (err) return res.status(500).send('Erro ao buscar');
        res.json(result);
    });
});
app.post('/produtos', (req, res)=>{
    const{descricao,quantidade,valor,secao}= req.body;
    console.log("Dados recebidos com sucesso!");
    const sql = "Insert into produtos(descricao,quantidade,valor,secao)Values(?,?,?,?)";
    db.query(sql,[descricao,quantidade,valor,secao],(err,result)=>{
        if(err)return res.status(500).send(err);
        res.send("Cadastro realizado com sucesso!")
    });
});
app.listen(3001, () => console.log('Servidor rodando na porta 3001'));