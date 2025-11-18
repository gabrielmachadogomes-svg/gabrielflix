// ===================================
// DADOS DE PRODUTOS
// ===================================

const produtos = [
    { id: 1, nome: "Smartphone X", preco: 1200.00 },
    { id: 2, nome: "Notebook Pro", preco: 4500.00 },
    { id: 3, nome: "Fone de Ouvido sem Fio", preco: 350.00 },
    { id: 4, nome: "Mouse Gamer RGB", preco: 150.00 }
];

// ===================================
// GESTÃO DO CARRINHO
// ===================================

let carrinho = [];

/**
 * Adiciona um produto ao carrinho.
 * @param {number} produtoId - O ID do produto a ser adicionado.
 */
function adicionarAoCarrinho(produtoId) {
    // 1. Encontra o produto na lista de produtos
    const produto = produtos.find(p => p.id === produtoId);

    if (produto) {
        // 2. Verifica se o produto já está no carrinho
        const itemCarrinho = carrinho.find(item => item.id === produtoId);

        if (itemCarrinho) {
            // Se já estiver, incrementa a quantidade
            itemCarrinho.quantidade++;
        } else {
            // Se não estiver, adiciona-o com quantidade 1
            carrinho.push({ ...produto, quantidade: 1 });
        }
        
        console.log(`✅ Produto "${produto.nome}" adicionado ao carrinho.`);
        atualizarExibicaoCarrinho();
    } else {
        console.error(`❌ Produto com ID ${produtoId} não encontrado.`);
    }
}

/**
 * Remove uma unidade de um produto do carrinho.
 * Se a quantidade for 1, remove o item inteiro.
 * @param {number} produtoId - O ID do produto a ser removido.
 */
function removerDoCarrinho(produtoId) {
    const indiceItem = carrinho.findIndex(item => item.id === produtoId);

    if (indiceItem !== -1) {
        let item = carrinho[indiceItem];

        if (item.quantidade > 1) {
            // Se houver mais de um, decrementa a quantidade
            item.quantidade--;
            console.log(`➖ Quantidade de "${item.nome}" reduzida para ${item.quantidade}.`);
        } else {
            // Se a quantidade for 1, remove o item da array
            const nomeRemovido = item.nome;
            carrinho.splice(indiceItem, 1);
            console.log(`🗑️ Produto "${nomeRemovido}" removido completamente do carrinho.`);
        }

        atualizarExibicaoCarrinho();
    } else {
        console.warn(`⚠️ Produto com ID ${produtoId} não está no carrinho.`);
    }
}

/**
 * Calcula o valor total dos itens no carrinho.
 * @returns {number} O valor total.
 */
function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

// ===================================
// FUNÇÕES DE INTERAÇÃO (DOM/CONSOLE)
// ===================================

/**
 * Renderiza a lista de produtos (Simulação de DOM para o console).
 */
function exibirProdutos() {
    console.log("\n===================================");
    console.log("          PRODUTOS DISPONÍVEIS     ");
    console.log("===================================");
    produtos.forEach(p => {
        console.log(`ID: ${p.id} | ${p.nome} | R$ ${p.preco.toFixed(2).replace('.', ',')}`);
    });
    console.log("===================================\n");
}


/**
 * Atualiza a exibição do carrinho (Simulação de DOM para o console).
 */
function atualizarExibicaoCarrinho() {
    const total = calcularTotal();

    console.log("\n--- CARRINHO DE COMPRAS ---");
    if (carrinho.length === 0) {
        console.log("Seu carrinho está vazio.");
    } else {
        carrinho.forEach(item => {
            console.log(`${item.quantidade}x - ${item.nome} (R$ ${item.preco.toFixed(2).replace('.', ',')} cada)`);
        });
    }
    console.log(`\nVALOR TOTAL: R$ ${total.toFixed(2).replace('.', ',')}`);
    console.log("---------------------------\n");
}


// ===================================
// EXEMPLO DE USO / EXECUÇÃO
// ===================================

exibirProdutos();

// Adicionando alguns itens
adicionarAoCarrinho(1); // Smartphone X
adicionarAoCarrinho(3); // Fone de Ouvido
adicionarAoCarrinho(1); // Mais um Smartphone X (incrementa a quantidade)

// Removendo um item
removerDoCarrinho(3); // Remove o Fone de Ouvido

// Tentando remover um item que tem mais de uma unidade
removerDoCarrinho(1); // A quantidade de Smartphone X deve cair para 1