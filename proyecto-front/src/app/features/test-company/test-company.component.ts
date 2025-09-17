import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../core/services/company.service';
import { Company } from '../../shared/models/company.model';

@Component({
  selector: 'app-test-company',
  templateUrl: './test-company.component.html',
  styleUrls: ['./test-company.component.scss']
})
export class TestCompanyComponent implements OnInit {

  companies: Company[] = [];
  loading = true;
  errorMessage = '';

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.loading = false;
        console.log('Compañías cargadas:', this.companies);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Error al cargar las compañías. Por favor, intenta nuevamente.';
        console.error('Error cargando compañías:', error);
      }
    });
  }

  // Función para recargar las compañías
  reloadCompanies(): void {
    this.loadCompanies();
  }
}