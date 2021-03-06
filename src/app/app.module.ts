import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgQrScannerModule } from 'angular2-qrscanner';

import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { CadastroComponent } from './view/cadastro/cadastro.component';

import { CategoriasComponent } from './view/categorias/categorias.component';
import { EsqueceuSenhaComponent } from './view/esqueceu-senha/esqueceu-senha.component';
import { RedefinirSenhaComponent } from './view/redefinir-senha/redefinir-senha.component';
import { CadastroProdutoComponent } from './view/cadastro-produto/cadastro-produto.component';
import { ListaProdutosComponent } from './view/lista-produtos/lista-produtos.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { QrCodeComponent } from './shared/components/qr-code/qr-code.component';
import { PagamentoComponent } from './view/pagamento/pagamento.component';
import { PedidosComponent } from './view/pedidos/pedidos.component';
import { ErrorComponent } from './view/error/error.component';
import { AdminGuard } from './core/guards/admin.guard';
import { TableGuard } from './core/guards/table.guard';
import { PedidoConfirmacaoCardComponent } from './shared/components/pedido-confirmacao-card/pedido-confirmacao-card.component';
import { PedidoPreparacaoCardComponent } from './shared/components/pedido-preparacao-card/pedido-preparacao-card.component';
import { PedidoEntregandoCardComponent } from './shared/components/pedido-entregando-card/pedido-entregando-card.component';
import { PedidoConcluidoCardComponent } from './shared/components/pedido-concluido-card/pedido-concluido-card.component';
import { ListaMesasComponent } from './view/lista-mesas/lista-mesas.component';
import { MesaComponent } from './view/mesa/mesa.component';



import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ProdutoComponent } from './view/produto/produto.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    CategoriasComponent,
    EsqueceuSenhaComponent,
    RedefinirSenhaComponent,
    CadastroProdutoComponent,
    ProdutoComponent,
    AdminComponent,
    ListaProdutosComponent,
    ProgressBarComponent,
    QrCodeComponent,
    PagamentoComponent,
    PedidosComponent,
    ErrorComponent,
    PedidoConfirmacaoCardComponent,
    PedidoPreparacaoCardComponent,
    PedidoEntregandoCardComponent,
    PedidoConcluidoCardComponent,
    ListaMesasComponent,
    MesaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true
    }),
    BsDropdownModule.forRoot(),
    NgQrScannerModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [AuthService, AuthGuard, AdminGuard, TableGuard, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
