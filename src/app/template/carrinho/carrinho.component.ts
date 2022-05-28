import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  itensPendentes: boolean = false

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private pedidos: PedidosService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  adicionaItem(produto: any): void{
    this.carrinhoService.adicionarAoCarrinho(produto)
    this.itensPendentes = true
  }
  removeItem(produto: any): void{
    this.carrinhoService.tiraItem(produto)
  }

  realizaPedidos(): void{
    if ( localStorage.getItem("mesa") ) {
      const mesa = localStorage.getItem("mesa") as string
      this.pedidos.postPedido(this.carrinhoService.carrinho, mesa)
        .subscribe(res => {
          this.carrinhoService.realizaPedidos()
          this.toastr.success("Pedido enviado para a cozinha 😋")
          this.itensPendentes = false
        })
    } else {
      this.toastr.error("Opa algo deu errado 😥")
    }
  }

  finalizaPedido(): void {
    // Atendimento presencial
    this.router.navigate(['/pagamento'])
  }

  limpaCarrinho(): void {
    this.carrinhoService.limpaCarrinho()
  }
}
