const btnBuscarProdutos = document.getElementById('mercearia');  
const btnBuscarDph = document.getElementById('produtos_dph');
const btnBuscarLaticinios = document.getElementById('laticinios'); 
const listamercearia = document.getElementById('list_mercearia'); 
const listadph = document.getElementById('list_dph'); 
const listLaticinios = document.getElementById('list_laticinios'); 
const form = document.getElementById('Cadastro-estoque');
const btnLimparMercearia = document.getElementById('limpar_mercearia');
const btnLimparDph = document.getElementById('limpar_dph');
const btnLimparLaticinios = document.getElementById('limpar_laticinios');

btnLimparMercearia.addEventListener('click', () => {
    listamercearia.innerHTML = '';
});

// Evento para limpar a tabela de DPH
btnLimparDph.addEventListener('click', () => {
    listadph.innerHTML = '';
});
btnLimparLaticinios.addEventListener('click', () => {
    listLaticinios.innerHTML = '';
});

// Função genérica para buscar e exibir
async function carregarProdutos(endpoint, container) {
    try {
        const resposta = await fetch(`http://localhost:3001/${endpoint}`);
        const dados = await resposta.json();

      container.innerHTML = '';
      if (dados.length === 0) {
            container.innerHTML = '<p>Nenhum produto cadastrado nesta seção.</p>';
            return;
        }

        // Cria a estrutura da tabela
        let tabelaHTML = `
            <table class="tabela-produtos">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço (R$)</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        dados.forEach(item => {
   tabelaHTML += `
                <tr>
                    <td>${item.descricao}</td>
                    <td>${item.quantidade}</td>
                    <td>R$ ${Number(item.valor).toFixed(2).replace('.', ',')}</td>
                </tr>
            `;
        });

        tabelaHTML += `
                </tbody>
            </table>
        `;

        container.innerHTML = tabelaHTML;

    } catch (err) {
        console.error('Erro ao buscar:', err);
        container.innerHTML = '<p>Erro ao carregar dados.</p>';
    }
}

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
const valorSecao = form.querySelector('input[name="secao"]').value;
const valorNome = form.querySelector('input[name="descricao"]').value;
const secaoDescricao = valorNome ? valorNome.charAt(0).toUpperCase() + valorNome.slice(1).toLowerCase(): '';
const secaoFormatada = valorSecao ? valorSecao.charAt(0).toUpperCase() + valorSecao.slice(1).toLowerCase() : '';

const dados = {
    descricao: secaoDescricao,
    quantidade: form.querySelector('input[name="quantidade"]').value,
    valor: form.querySelector('input[name="valor"]').value.replace(',', '.'),
    secao: secaoFormatada
};

try{
    const resposta = await fetch('http://localhost:3001/produtos',{
        method:'Post',
        headers:{'Content-type' : 'application/json'},
        body:JSON.stringify(dados)
    });
if(resposta.ok){
    alert("Dados enviados com sucesso!");
    form.reset();
}else{
    const erro = await resposta.text();
    alert("Erro ao enviar dados " + erro)
}
}catch(err){
    alert('Erro de conexão com o servidor!')
}
})

// Eventos de clique
btnBuscarProdutos.addEventListener('click', () => {
    carregarProdutos('produtos', listamercearia, 'mercearia' );
});

btnBuscarDph.addEventListener('click', () => {
    carregarProdutos('dph', listadph);
});
btnBuscarLaticinios.addEventListener('click', () => {
    carregarProdutos('laticinios', listLaticinios);
});
