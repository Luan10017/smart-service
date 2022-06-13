import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MesaService } from 'src/app/core/services/mesa.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  mesa = "1"
  status = "ocupado"

  itens :any = []
  total = 0

  constructor(
    private route: ActivatedRoute,
    private mesaService: MesaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => this.mesa = res.id)
    this.mesaService.getMesa(this.mesa)
      .subscribe(res => {
        this.itens = res.data[0].produtos
        this.total = res.data[0].valor_total
        this.status = res.data[0].status_mesa
      })
  }

  liberaMesa(){
    this.mesaService.alteraStatusMesaParaLivre(this.mesa)
      .subscribe(res => {
        this.toastr.success("Mesa fechada com sucesso!")
      },
      error => {
        this.toastr.error("Opa algo deu errado.")
      })
  }

}
