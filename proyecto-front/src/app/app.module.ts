import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importante
import { LoginComponent } from './features/auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TestCompanyComponent } from './features/test-company/test-company.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { StoryListComponent } from './features/stories/story-list/story-list.component';
import { TicketListComponent } from './features/tickets/ticket-lits/ticket-list.component';
import { AppComponent } from './app.component';
import { CompanyService } from './core/services/company.service';
import { ProjectService } from './core/services/project.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestCompanyComponent,
    RegisterComponent,
    ProjectListComponent,
    StoryListComponent,
    TicketListComponent
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,            // para [(ngModel)]
    ReactiveFormsModule,    // formularios reactivos
    AppRoutingModule
  ],
  providers: [CompanyService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
