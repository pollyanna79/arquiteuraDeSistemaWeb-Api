// Captura o formulário pelo elemento
const form = document.getElementById('meuFormulario');
const lista = document.querySelector('#corpo-tabela');
const btnLimparlista = document.getElementById('limpaLista');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: form.querySelector('input[name="nome"]').value,
        telefone: form.querySelector('input[name="telefone"]').value,
        cep: form.querySelector('input[name="cep"]').value,
        endereco: form.querySelector('input[name="endereco"]').value,
        cpf: form.querySelector('input[name="cpf"]').value,
        email: form.querySelector('input[name="email"]').value,
        senha: form.querySelector('input[name="senha"]').value
        
    };

    try {
        const resposta = await fetch('http://localhost:3000/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            alert('Dados enviados com sucesso!');
            form.reset(); // Limpa o formulário após sucesso
        } else {
            const erro = await resposta.text();
            alert('Erro ao enviar: ' + erro); // Agora você verá o erro real do banco
        }
    } catch (err) {
        alert('Erro de conexão com o servidor');
    }
});
btnLimparlista.addEventListener('click', () => {
    lista.innerHTML = '';
});

// 2. Buscando dados (GET)
<<<<<<< HEAD
const btnBuscar = document.querySelector('button[type="button"]'); //Identificando o Botão que vai solicitar a informação ao banco
 // Identificando a tag que vai armazenar os dados que vem do banco//
=======

const lista = document.querySelector('#listaClientes'); // Identificando a tag que vai armazenar os dados que vem do banco//
const botao = document.querySelector('#btnBuscar');
>>>>>>> polly
//função que vai tazer e formatar a informação //
botao.addEventListener('click', async () => {
    try {
    const resposta = await fetch('http://localhost:3000/clientes');
    const dados = await resposta.json();

    // Limpa a lista antes de adicionar novos dados
    lista.innerHTML = '';
<<<<<<< HEAD
    const tbody = document.getElementById('corpo-tabela');
    dados.forEach(cliente => {
const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
    `;

    tbody.appendChild(tr);
});
      
=======
    // Cria a estrutura da tabela
    const tabela = document.createElement('table');
    tabela.innerHTML = `
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        const tbody = tabela.querySelector('tbody');
    dados.forEach(cliente => {
        const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
            `;
            tbody.appendChild(linha);
        });

        // Adiciona a tabela pronta dentro do elemento 'lista'
        lista.appendChild(tabela);
        } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        lista.innerHTML = '<p style="color: red;">Não foi possível carregar os dados.</p>';
    }
>>>>>>> polly
});