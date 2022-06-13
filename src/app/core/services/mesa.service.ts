import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  baseUrl = `${environment.API}`

  constructor(private http: HttpClient) { }

  getMesas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}mesas`)
  }
  getMesa(mesa: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}mesa/${mesa}`)
  }

  alteraStatusMesaParaLivre(mesa: string):  Observable<any> {
    return this.http.patch<any>(`${environment.API}presencial/alterar/status/mesa/${mesa}`,{status:"LIVRE"})
  }
}
