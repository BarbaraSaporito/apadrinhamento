import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    this.authService.autenticado().subscribe(
      (result) => {
        if (!result) {
          this.router.navigate(['/login']);
        }
        else{
          this.router.navigate(['/padrinhos']);
        }
      },
      (error) => {
        console.log('erro ao navegar', error);
        this.router.navigate(['/login']);
      }
    );
    return true;
  }
}
