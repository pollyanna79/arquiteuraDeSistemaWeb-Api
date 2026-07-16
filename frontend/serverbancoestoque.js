const btnBuscarProdutos = document.getElementById('mercearia');  
const div = document.getElementById('container');
const listamercearia = document.getElementById('produtos_mercearia'); 


// Função genérica para buscar e exibir
async function carregarProdutos(endpoint, container) {
    try {
        const resposta = await fetch(`http://localhost:3001/${endpoint}`);
        const dados = await resposta.json();

      container.innerHTML = '';
        
        dados.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `Produto: ${item.produto} || R$: ${item.valor}`;
            container.appendChild(p);
        });
    } catch (err) {
        console.error('Erro ao buscar:', err);
        container.innerHTML = '<p>Erro ao carregar dados.</p>';
    }
}

// Eventos de clique
btnBuscarProdutos.addEventListener('click', () => {
    carregarProdutos('produtos', listamercearia, 'mercearia');
});

