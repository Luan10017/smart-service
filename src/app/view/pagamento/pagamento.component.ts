import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from 'src/app/core/services/carrinho.service';
import { Carrinho } from 'src/app/shared/models/carrihno';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  carrinho: Carrinho = new Carrinho();
  nomeUsuario: String = "Cliente01"

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    if (localStorage.getItem("carrinho") && this.carrinhoService.carrinho.length === 0) {
      const itensCarrinho = JSON.parse(localStorage.getItem("carrinho")!) 
      this.carrinhoService.carregaCarrinhoLocalStorage(itensCarrinho)
    }
    if (localStorage.getItem("nomeUsuario")) {
      this.nomeUsuario = localStorage.getItem("nomeUsuario") as string
    }
    const carrinhoPagamento = this.carrinhoService.carrinho.itens.filter( ({realizado}) => realizado === true)
    this.carrinho.itens = carrinhoPagamento
    this.atualizaTotal()

    setTimeout(()=>{
      localStorage.clear()
    },5000)
  }

  atualizaTotal(): void {
    let valorTotal = 0
    
    for (let i=0; i < this.carrinho.length; i++) {
      valorTotal += this.carrinho.itens[i].quantidade * this.carrinho.itens[i].preco
    }
    this.carrinho.total = valorTotal
  }


}