class Venda {
    constructor(id, quantidade, preco) {
        this.id = id;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    getId() {
        return this.id;
    }
    getQuantidade() {
        return this.quantidade;
    }
    getpreco() {
        return this.preco;
    }
    setId(id) {
        this.id = id;
    }
    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }
    setpreco(preco) {
        this.preco = preco;
    }
    getValorTotal() {
        return this.preco * this.quantidade;
    }


}
var venda1 = new Venda(1, 5, 100);
var venda2 = new Venda(2, 3, 50);

console.log(venda1.getValorTotal());
console.log(venda2 .getValorTotal());
