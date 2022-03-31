// import { Evento } from './../classes/Evento';
import { HttpClient } from '@angular/common/http';
import { CoreService } from './core-service';
import { Injectable } from '@angular/core';
import { Produto } from '../classes/Produto';

@Injectable({
  providedIn: 'root'
})
export class EventosService extends CoreService<Produto> {

  constructor(protected override http: HttpClient) {
    super(http, "http://localhost:8080/api/eventos");
  }

}
