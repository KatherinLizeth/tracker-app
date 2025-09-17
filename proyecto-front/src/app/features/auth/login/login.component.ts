import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 👈 Importar router
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // aquí
  ) {}

  onLogin() {
    // Resetear mensajes de error
    this.errorMessage = '';
    
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Token recibido:', response.access);
        this.authService.saveToken(response.access);
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        
        // Manejar diferentes tipos de errores
        if (error.error.detail === 'No active account found with the given credentials') {
          this.errorMessage = 'Cuenta no activa. Contacta al administrador o verifica tu email de activación.';
        } else {
          this.errorMessage = error.error.detail || 'Credenciales inválidas';
        }
        
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
}