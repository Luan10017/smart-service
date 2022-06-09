import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-mesas',
  templateUrl: './lista-mesas.component.html',
  styleUrls: ['./lista-mesas.component.css']
})
export class ListaMesasComponent implements OnInit {

  mesas = ["1","2","3","4","5","6","7","8","9","10"]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  vaiParaDetalhesMesa(id: string) {
    this.router.navigate([`/admin/mesa/${id}`])
  }

}
