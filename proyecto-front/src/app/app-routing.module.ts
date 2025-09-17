import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { TestCompanyComponent } from './features/test-company/test-company.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { TicketListComponent } from './features/tickets/ticket-lits/ticket-list.component';

const routes: Routes = [
// Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas protegidas
  { path: 'projects', component: ProjectListComponent },
  { path: 'test-company', component: TestCompanyComponent },

  // Redirecciones
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }  // ruta inválida → login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 
  exports: [RouterModule]                  // 
})
export class AppRoutingModule {}