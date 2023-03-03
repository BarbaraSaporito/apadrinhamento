import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  logoImg: string = 'https://firebasestorage.googleapis.com/v0/b/apadrinhamento-b26b0.appspot.com/o/logo.png?alt=media&token=49d5ae97-7b78-4153-9a11-67dbca3b2f46'
  password!: string;
  error!: string;

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.password).subscribe(
      success => {
        if (success) {
          // login successful
        } else {
          this.error = 'Esse código não existe';
        }
      },
      error => {
        this.error = 'Algum erro ocorreu ao tentar logar';
      }
    );
  }
}

