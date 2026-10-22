document.getElementById('carregarBtn').addEventListener('click', async () => {
    try {
        const resposta = await fetch('http://localhost:3002/vendedores');
        const dados = await resposta.json();

        const tbody = document.getElementById('tabela-vendedores');
        tbody.innerHTML = ''; 

        // Verifica se 'dados' é realmente um array antes de usar o forEach
        if (Array.isArray(dados)) {
            dados.forEach(vendedor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${vendedor.id_vendedor}</td>
                    <td>${vendedor.nome}</td>
                    <td>R$ ${vendedor.vendas}</td>
                    <td>${vendedor.regiao}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error('A resposta da API não é uma lista:', dados);
            alert('Erro retornado pelo servidor: ' + (dados.erro || 'Desconhecido'));
        }
    } catch (erro) {
        console.error('Erro ao buscar vendedores:', erro);
        alert('Não foi possível carregar os dados do servidor.');
    }
});