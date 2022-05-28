import { Component, OnInit, TemplateRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Produto } from 'src/app/shared/models/Produto';
import { MenuService } from 'src/app/core/services/menu.service';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  produtos:  Produto[] = []
  baseUrl = `${environment.API}produtos?page=0`
  modalRef!: BsModalRef;

  produtoId: string = "";

  constructor(
    private productService: MenuService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.listaProdutos()

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide()
    }, 5000);
  }

  listaProdutos(): void {
    this.productService.getItens(this.baseUrl).pipe(map(result => result.data[0].produtos))
      .subscribe({
        next:(res) => {
          this.produtos = res
        },
        error: (error: any) => console.log(error),
        complete: () => this.spinner.hide()
      })
  }

  deletaProduto(produtoId: string): void {
    const deleteUrl = `${environment.API}deleta/produto/${produtoId}`
    this.productService.deleteProduct(deleteUrl).subscribe(res => {
      this.listaProdutos()
      this.toastr.success("Produto deletado com sucesso!")
    }, error => {
      this.toastr.error("Opa algo deu errado.")
    });
  }


  /*openModal(event: any, template: TemplateRef<any>) {
    event.stopPropagation();

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }*/

  openModal(event: any, template: TemplateRef<any>, produtoId: string) {
    this.produtoId = produtoId;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef.hide();
  }

  confirm(): void {

    this.modalRef.hide();

    this.deletaProduto(this.produtoId);

  }


}
