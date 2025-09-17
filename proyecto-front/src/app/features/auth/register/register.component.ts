import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../core/services/company.service';
import { Company } from '../../../shared/models/company.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})



export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  confirmPassword = '';
  selectedCompany: number | null = null;

  companies: Company[] = [];
  loading = true;
  registerError = '';
  isSubmitting = false;
  successMessage = '';

  constructor(private companyService: CompanyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error cargando compañías:', error);
      }
    });
  }

  onRegister(): void {
    // Resetear mensajes
    this.registerError = '';
    this.successMessage = '';

    // Validaciones
    if (!this.username || !this.password || !this.confirmPassword || !this.selectedCompany) {
      this.registerError = 'Por favor, complete todos los campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.registerError = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 6) {
      this.registerError = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.isSubmitting = true;

    // Llamar al servicio de autenticación para registrar al usuario
    this.authService.register(this.username, this.password, this.selectedCompany).subscribe({
      next: (response) => {
        this.successMessage = 'Registro exitoso. Ahora puede iniciar sesión.';
        
        // Limpiar el formulario después de un registro exitoso
        this.resetForm();
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.registerError = error.error?.message || 
                            error.error?.username?.[0] || 
                            'Error en el registro. Por favor, intente nuevamente.';
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

   private resetForm(): void {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.selectedCompany = null;
  }



}
