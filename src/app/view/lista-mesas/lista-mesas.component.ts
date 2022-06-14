import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesaService } from 'src/app/core/services/mesa.service';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.css']
})
export class ListaMesasComponent implements OnInit {

  mesas: any = []

  constructor(
    private router: Router,
    private mesaService: MesaService,
  ) { }

  ngOnInit(): void {
    this.getMesas()
    setInterval(() => {
      this.getMesas()
    }, 10000)
  }

  getMesas() {
    this.mesaService.getMesas()
      .subscribe(res => {
        this.mesas = res.data[0]
      })
  }

  vaiParaDetalhesMesa(id: string) {
    this.router.navigate([`/admin/mesa/${id}`])
  }

}
