const btnBuscarProdutos = document.getElementById('mercearia');  
const div = document.getElementById('container');
const listamercearia = document.getElementById('produtos_mercearia'); 


// Função genérica para buscar e exibir
async function carregarProdutos(endpoint, container) {
    try {
        const resposta = await fetch(`http://localhost:3001/${endpoint}`);
        const dados = await resposta.json();

      container.innerHTML = '';
      // Cria a estrutura da tabela
        const tabela = document.createElement('table');
        tabela.innerHTML = `
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Valor (R$)</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = tabela.querySelector('tbody');
        
        dados.forEach(item => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${item.produto}</td>
                <td>R$ ${item.valor}</td>
            `;
            tbody.appendChild(linha);
        });

        // Adiciona a tabela pronta dentro do container
        container.appendChild(tabela);

    } catch (err) {
        console.error('Erro ao buscar:', err);
        container.innerHTML = '<p style="color: red;">Erro ao carregar dados.</p>';
    }
}

// Eventos de clique
btnBuscarProdutos.addEventListener('click', () => {
    carregarProdutos('produtos', listamercearia, 'mercearia');
});

