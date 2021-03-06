import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../shared/models/usuario';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usuarioAutenticado: boolean = false
  private usuarioAdmin: boolean = false
  private mesaSelecionada: boolean = false

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  url=`${environment.API}auth`
  autentica(usuario: Usuario): Observable<any> {
      return this.http.post(this.url, usuario)
  }


  fazerLogin(usuario: Usuario){
      this.autentica(usuario).subscribe(
      response => {
        const nomeUsuario = response.data[0].usuario
        const nivelUsuario = response.data[0].nivel_usuario
        const idUsuario = response.data[0].id_usuario

        this.usuarioAutenticado = true
        localStorage.setItem("usuarioAutenticado","true")
        localStorage.setItem("emailUsuario",`${usuario.email}`)
        localStorage.setItem("nomeUsuario",`${nomeUsuario}`)
        localStorage.setItem("idUsuario",`${idUsuario}`)
        if ( nivelUsuario === "ADMINISTRADOR" ) {
          this.usuarioAdmin = true
          localStorage.setItem("isAdmin", "true")
          this.router.navigate(['/admin/lista/produtos'])
        } else {
          this.usuarioAdmin = false
          localStorage.setItem("isAdmin", "false")
          this.router.navigate(['/'])
        }
      },
      error => {
        this.toastr.error("email ou senha inválidos")
      }
    );
  }

  selectTable(table: string, userName: string){
    this.mesaSelecionada = true
    localStorage.setItem("mesaSelecionada","true")
    localStorage.setItem("mesa", table)
    localStorage.setItem("nomeUsuario", userName)
    this.router.navigate(['/'])
  }

  mesaEstaSelecionada() {
    return this.mesaSelecionada
  }

  verificaStatusMesa(mesa: string):  Observable<any> {
    return this.http.get<any>(`${environment.API}mesa/${mesa}`)
  }
  
  alteraStatusMesaParaOcupado(mesa: string):  Observable<any> {
    return this.http.patch<any>(`${environment.API}presencial/alterar/status/mesa/${mesa}`,{status:"OCUPADA"})
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado
  }

  usuarioIsAdmin() {
    return this.usuarioAdmin
  }

  fazerLogoff():void {
    localStorage.removeItem("usuarioAutenticado")
    localStorage.removeItem("emailUsuario")
    localStorage.removeItem("nomeUsuario")
    localStorage.removeItem("idUsuario")
    localStorage.removeItem("isAdmin")
    this.router.navigate(['/login'])
  } 
}
