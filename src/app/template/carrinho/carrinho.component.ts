import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/core/services/carrinho.service';
import { PedidosService } from 'src/app/core/services/pedidos.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  @Input() carrinho: any;
  classToItemRealizado = {}

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private pedidos: PedidosService
  ) { }

  ngOnInit(): void {
  }

  adicionaItem(produto: any): void{
    this.carrinhoService.adicionarAoCarrinho(produto)
  }
  removeItem(produto: any): void{
    this.carrinhoService.tiraItem(produto)
  }

  realizaPedidos(): void{

    // Atendimento remoto
    this.pedidos.postPedido(this.carrinhoService.carrinho, "1").subscribe(res => {
      console.log(res)
    })
    this.carrinhoService.realizaPedidos()
  }

  finalizaPedido(): void {
    // Atendimento presencial
    this.router.navigate(['/pagamento'])
  }

  limpaCarrinho(): void {
    this.carrinhoService.limpaCarrinho()
  }
}
