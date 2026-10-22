const express = require('express');
const app = express();
const cors = require('cors'); // Essencial para permitir a conversa entre domínios diferentes
const mysql = require('mysql2');
require('dotenv').config(); // Carrega as variáveis do .env

app.use(cors());
app.use(express.json());
console.log(process.env.DB_NAME);
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Quantidade máxima de conexões simultâneas
    queueLimit: 0
});



// Rota para buscar produtos 
app.get('/produtos', (req, res) => {
    db.query("SELECT produto, valor FROM produtos", (err, result) => {
        if (err) return res.status(500).send('Erro ao buscar');
        res.json(result);
    });
});


app.post('/produtos', (req, res)=>{
    const{produto,valor,secao,estoque}= req.body;
    console.log("Dados recebidos com sucesso!");
    const sql = "Insert into produtos(produto,valor,secao,estoque)Values(?,?,?,?)";
    db.query(sql,[produto,valor,secao,estoque],(err,result)=>{
        if(err)return res.status(500).send(err);
        res.send("Cadastro realizado com sucesso!")
    });
});
app.listen(3001, () => console.log('Servidor rodando na porta 3001'));