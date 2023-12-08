import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  logoImg: string = 'https://firebasestorage.googleapis.com/v0/b/apadrinhamento-b26b0.appspot.com/o/logo.png?alt=media&token=49d5ae97-7b78-4153-9a11-67dbca3b2f46'
  password: string = '';
  hide = true;

  constructor(
    private mSnack: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    
    ) { }

  ngOnInit(): void {

  }

  onLogin() {
    this.authService.login(this.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/padrinhos']);
        } else {
           this.router.navigate(['/padrinhos']);
        }
      },
    );
  }

  abrirAlert(message: string) {
    this.mSnack.open(message, 'X', {
        duration: 2500,
        horizontalPosition: 'end',
        verticalPosition: 'top',
    });
}
}

