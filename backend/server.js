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
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao Banco de Dados!");
});


// Rota de Inserção (Cria a ponte de envio)
app.post('/clientes', (req, res) => {
    const { nome, email, senha } = req.body;
    console.log("Dados recebidos:", nome, email, senha);
    // O comando SQL abaixo insere os dados recebidos na tabela
    const sql = "INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Cadastrado com sucesso");
    });
});

// Rota de Consulta (Cria a ponte de retorno)
app.get('/clientes', (req, res) => {
    db.query("SELECT * FROM clientes", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result); // O servidor transforma o resultado SQL em JSON e envia pro front
    });
});
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));