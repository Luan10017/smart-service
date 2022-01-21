import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './view/login/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { CadastroComponent } from './view/cadastro/cadastro.component';

import { HttpClientModule } from '@angular/common/http';
import { HamburgerComponent } from './view/hamburger/hamburger.component';
import { PorcoesComponent } from './view/porcoes/porcoes.component';
import { BebidasComponent } from './view/bebidas/bebidas.component';
import { AlcoolicasComponent } from './view/alcoolicas/alcoolicas.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsqueceuSenhaComponent } from './view/esqueceu-senha/esqueceu-senha.component';
import { RedefinirSenhaComponent } from './view/redefinir-senha/redefinir-senha.component';
import { CadastroProdutoComponent } from './view/cadastro-produto/cadastro-produto.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    HamburgerComponent,
    PorcoesComponent,
    BebidasComponent,
    AlcoolicasComponent,
    EsqueceuSenhaComponent,
    RedefinirSenhaComponent,
    CadastroProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    CarouselModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true
    })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
