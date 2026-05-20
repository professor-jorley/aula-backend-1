// ====================================================================================
// AULA: FLUXO REAL DE MOVIMENTAÇÃO DE ESTOQUE (ENTRADA E SAÍDA)
// ====================================================================================

// Importa o módulo nativo 'readline' para permitir ler dados digitados no teclado.
const readline = require('readline');

// Configura a interface dizendo que a entrada vem do teclado (stdin) e a saída vai para a tela (stdout).
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Criamos o objeto 'produtoJanela' que representará o item sendo manipulado no sistema.
const produtoJanela = {
    nome: "",         // Propriedade para armazenar o nome do produto (Texto).
    preco: 0,         // Propriedade para armazenar o preço unitário (Número).
    estoque: 0,       // Propriedade que guardará a quantidade real em estoque (Inicia em zero).

    // Método que calcula e exibe o resumo atual do produto na tela.
    exibirResumo: function() {
        console.log("\n========================================");
        console.log(`STATUS ATUAL DO PRODUTO:`);
        console.log(`NOME: ${this.nome}`); // Acessa o nome atualizado.
        console.log(`PREÇO: R$ ${this.preco.toFixed(2)}`); // Acessa o preço formatado.
        console.log(`QUANTIDADE EM ESTOQUE: ${this.estoque} unidades`); // Mostra o estoque real.
        console.log(`VALOR TOTAL EM ESTOQUE: R$ ${(this.preco * this.estoque).toFixed(2)}`); // Multiplica preço pelo estoque real.
        console.log("========================================\n");
    },

    // Método para dar entrada (comprar/abastecer) no estoque.
    adicionarEstoque: function(quantidade) {
        this.estoque += quantidade; // Soma a quantidade digitada ao estoque atual.
        console.log(`[ENTRADA] Adicionadas ${quantidade} unidades ao estoque de ${this.nome}.`);
    },

    // Método para dar saída (vender) do estoque.
    venderProduto: function(quantidade) {
        // Verifica se a quantidade que o cliente quer comprar existe no estoque.
        if (this.estoque >= quantidade) {
            this.estoque -= quantidade; // Subtrai a quantidade vendida do estoque atual.
            const faturamento = quantidade * this.preco; // Calcula o valor ganho com a venda.
            console.log(`[VENDA SUCESSO] Vendidas ${quantidade} unidades de ${this.nome}.`);
            console.log(`[CAIXA] Faturamento da venda: R$ ${faturamento.toFixed(2)}`);
        } else {
            // Se não houver saldo suficiente, exibe uma mensagem de erro.
            console.log(`[VENDA ERRO] Estoque insuficiente para vender ${quantidade} unidades de ${this.nome}.`);
        }
    }
};

// --- INÍCIO DO FLUXO INTERATIVO (PERGUNTAS EM SEQUÊNCIA) ---

console.log(">>> SISTEMA DE CONTROLE DE ESTOQUE DEDICADO <<<");

// Pergunta 1: Captura o nome do produto.
rl.question("1. Digite o nome do produto para cadastro: ", (respostaNome) => {
    produtoJanela.nome = respostaNome; // Guarda o nome digitado dentro do objeto.

    // Pergunta 2: Captura o preço do produto.
    rl.question("2. Digite o preço unitário do produto: ", (respostaPreco) => {
        produtoJanela.preco = parseFloat(respostaPreco); // Converte o texto do preço para número decimal e guarda no objeto.

        // Pergunta 3: Captura a quantidade inicial que vai entrar no estoque.
        rl.question("3. Quantas unidades estão entrando no estoque agora? (Entrada): ", (respostaEntrada) => {
            const qtdEntrada = parseInt(respostaEntrada); // Converte o texto digitado para um número inteiro.
            produtoJanela.adicionarEstoque(qtdEntrada); // Executa o método de entrada do objeto para abastecer o estoque.
            produtoJanela.exibirResumo(); // Mostra na tela como o objeto ficou após o cadastro e a entrada.

            // Pergunta 4: Simula uma venda (saída) para testar a lógica de negócios.
            rl.question("4. Quantas unidades você deseja vender deste produto? (Saída): ", (respostaVenda) => {
                const qtdVenda = parseInt(respostaVenda); // Converte o texto da venda para um número inteiro.
                produtoJanela.venderProduto(qtdVenda); // Executa o método de venda, que vai tentar subtrair do estoque.
                produtoJanela.exibirResumo(); // Exibe o resumo final mostrando o estoque atualizado após a venda.

                // Fecha a interface de comunicação com o teclado para encerrar o programa Node.js de forma limpa.
                rl.close();
            }); // Fim da Pergunta 4 (Venda)
        }); // Fim da Pergunta 3 (Entrada de Estoque)
    }); // Fim da Pergunta 2 (Preço)
}); // Fim da Pergunta 1 (Nome)

// ====================================================================================
// ANOTAÇÃO DIDÁTICA PARA OS ALUNOS:
// - O estoque não é mais uma multiplicação inventada. Ele começa em 0.
// - Na pergunta 3, o estoque aumenta através do operador '+='.
// - Na pergunta 4, o estoque diminui através do operador '-=', simulando a saída real da loja.
// - Isso demonstra como sistemas de e-commerce e faturamento operam nos bastidores.
// ====================================================================================