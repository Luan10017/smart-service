import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrinho } from 'src/app/shared/models/carrihno';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  postPedido(carrinho: Carrinho, mesa: string): Observable<any> {
    const baseUrl = `${environment.API}cadastra/pedido/presencial/mesa/${mesa}`

    const pedidoItens = carrinho.itens.map(({id, quantidade}) => ({id_produto: id, quantidade}))
    const pedidoPayload = {
      produtos: pedidoItens,
    }
    return this.http.post<any>(baseUrl,pedidoPayload)
  }
}
