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
    this.carrinho = this.carrinhoService.carrinho
    console.log(this.carrinho.length)
  }


}