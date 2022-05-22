import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TableGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
  
    return this.mesaSelecionada();
  }

  private mesaSelecionada() {
    if (this.authService.mesaEstaSelecionada() || localStorage.getItem("mesaSelecionada") ) {
      return true
    }
    this.router.navigate(['/qrcode']);
    return false
  }

}
