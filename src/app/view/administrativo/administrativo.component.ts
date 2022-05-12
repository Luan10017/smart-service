import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Produto } from 'src/app/shared/models/Produto';
import { MenuService } from 'src/app/core/services/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.css']
})
export class AdministrativoComponent implements OnInit {

  produtos:  Produto[] = []
  baseUrl = `${environment.API}produtos`

  constructor(private productService: MenuService) { }

  ngOnInit(): void {
    this.productService.getItens(this.baseUrl).pipe(map(result => result.data[0].produtos))
      .subscribe(res => {
        this.produtos = res
      })
  }

}
