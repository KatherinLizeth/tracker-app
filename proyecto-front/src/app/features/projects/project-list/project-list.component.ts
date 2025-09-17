import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { CompanyService } from '../../../core/services/company.service';
import { Project } from '../../../shared/models/project.model';
import { Company } from '../../../shared/models/company.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  companies: Company[] = [];
  companyProjects: { [key: number]: Project[] } = {}; // Proyectos por compañía
  collapsedCompanies: { [key: number]: boolean } = {};
  loading = true;

  constructor(
    private projectService: ProjectService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.loadCompaniesAndProjects();
  }

  
  loadCompaniesAndProjects(): void {
    this.loading = true;
    
    this.companyService.getCompanies().subscribe({
      next: (companiesData) => {
        this.companies = companiesData;
        
        // Inicializar estado de colapso (todas expandidas por defecto)
        this.companies.forEach(company => {
          this.collapsedCompanies[company.id] = false;
        });
        
        this.loadProjects();
      },
      error: (error) => {
        console.error('Error al cargar compañías:', error);
        this.loading = false;
      }
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projectsData) => {
        this.organizeProjectsByCompany(projectsData);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        this.loading = false;
      }
    });
  }

  organizeProjectsByCompany(projects: Project[]): void {
    this.companyProjects = {};
    projects.forEach(project => {
      if (!this.companyProjects[project.company]) {
        this.companyProjects[project.company] = [];
      }
      this.companyProjects[project.company].push(project);
    });
  }

  getProjectsForCompany(companyId: number): Project[] {
    return this.companyProjects[companyId] || [];
  }

  toggleCompany(companyId: number): void {
    this.collapsedCompanies[companyId] = !this.collapsedCompanies[companyId];
  }

  collapseAll(): void {
    this.companies.forEach(company => {
      this.collapsedCompanies[company.id] = true;
    });
  }

  expandAll(): void {
    this.companies.forEach(company => {
      this.collapsedCompanies[company.id] = false;
    });
  }

}