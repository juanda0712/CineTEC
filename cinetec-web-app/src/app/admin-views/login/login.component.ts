import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Login } from 'src/app/Interfaces/login';
import { ApiService } from 'src/app/Services/api-service';
import { AuthService } from 'src/app/Services/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm = new FormGroup({
    usuario: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private api: ApiService<Login>,
    private router: Router,
    private authService: AuthService
  ) {}

  submit() {
    const loginData: Login = {
      usuario: this.loginForm.get('usuario')?.value,
      password: this.loginForm.get('password')?.value,
    };
    console.log(loginData);
    this.api.create('Administrador/login', loginData).subscribe(
      () => {
        this.authService.login();
        this.router.navigate(['/admin-panel']);
      },
      (error: any) => {
        console.error('Error fetching login:', error);
      }
    );
  }
}
