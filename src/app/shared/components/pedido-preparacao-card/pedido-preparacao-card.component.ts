import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidosService } from 'src/app/core/services/pedidos.service';
import { environment } from 'src/environments/environment';
import { Pedido } from '../../models/Pedido';

@Component({
  selector: 'app-pedido-preparacao-card',
  templateUrl: './pedido-preparacao-card.component.html',
  styleUrls: ['./pedido-preparacao-card.component.css']
})
export class PedidoPreparacaoCardComponent implements OnInit {

  @Input() pedido!: Pedido;

  constructor(
    private pedidoService: PedidosService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  patchToEntregando(idPedido: string) {
    const baseUrl = `${environment.API}alterar/status/pedido/${idPedido}`
    const body = {"status":"CONCLUIDO"}
    this.pedidoService.patchStatus(baseUrl, body)
      .subscribe( res => {
        PedidosService.emitirPedidoStatus.emit("CONCLUIDO")
      }, error => {
        this.toastr.error("Opa algo deu errado 😥")
      })
  }

  patchToCancelado(idPedido: string) {
    const baseUrl = `${environment.API}alterar/status/pedido/${idPedido}`
    const body = {"status":"CANCELADO"}
    this.pedidoService.patchStatus(baseUrl, body)
      .subscribe( res => {
        PedidosService.emitirPedidoStatus.emit("PREPARANDO")
      }, error => {
        this.toastr.error("Opa algo deu errado 😥")
      })
  }

}
