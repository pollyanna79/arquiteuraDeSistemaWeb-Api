const express = require('express');
const app = express();
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();

app.use(cors());
app.use(express.json());
//Conexão com SSM (SQL)//
const dbConfig = {
    server: 'localhost',
    database: process.env.DB_SQL_DATABASE || 'db_vendas',
    user: 'admin', // MEU USÚARIO
    password: 'polly@79', //MINHA SENHA
    port: 1433,
    options: {
        encrypt: false,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};
// Rota GET: Buscar todos os vendedores
app.get('/vendedores', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM tb_vendedores_vendas');
        
        console.log("Dados consultados com sucesso:");
        console.table(result.recordset); 

        res.json(result.recordset);
    } catch (err) {
        console.error("Erro na consulta:", err.message);
        res.status(500).send({ erro: 'Erro ao buscar dados: ' + err.message });
    }
});

// Rota POST: Inserir um novo vendedor (exemplo para o SQL Server)
app.post('/vendedores', async (req, res) => {
    const { id_vendedor, nome, vendas, regiao } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        
        // No SQL Server usamos parâmetros com @ para evitar SQL Injection
        await pool.request()
            .input('id', sql.Int, id_vendedor)
            .input('nome', sql.VarChar, nome)
            .input('vendas', sql.Decimal(10,2), vendas)
            .input('regiao', sql.VarChar, regiao)
            .query('INSERT INTO tb_vendedores_vendas (id_vendedor, nome, vendas, regiao) VALUES (@id, @nome, @vendas, @regiao)');

        console.log(`Vendedor ${nome} cadastrado com sucesso!`);
        res.send("Cadastro realizado com sucesso!");
    } catch (err) {
        console.error("Erro ao inserir:", err.message);
        res.status(500).send({ erro: 'Erro ao cadastrar: ' + err.message });
    }
});

// Inicialização do Servidor na porta 3002
app.listen(3002, () => {
    console.log('Servidor de vendas (SQL Server) rodando na porta 3002');
});