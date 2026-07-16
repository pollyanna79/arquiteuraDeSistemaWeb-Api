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

db.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao Banco de Dados!");
});

// Rota de Consulta (Cria a ponte de retorno)
app.get('/produtos', (req, res) => {
    db.query("SELECT produto , valor FROM produtos", (err, result) => {
        if (err) {
            console.error('Erro na query:', err);
            return res.status(500).send('Erro ao buscar produtos');
        }
        res.json(result);
    });
});
app.listen(3001, () => console.log('Servidor rodando na porta 3001'));