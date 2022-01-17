import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/components/product-card/product.model';
import { MenuService } from 'src/app/menu.service';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: MenuService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products.filter(({categoria}) => categoria == "hamburguer")
    })
  }

}
