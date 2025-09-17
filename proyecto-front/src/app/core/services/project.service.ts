import { Injectable } from '@angular/core';
import { Project } from '../../shared/models/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8000/api/projects/';


  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    // Puedes agregar parámetros para expandir la compañía si tu API lo permite
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}${id}/`);
  }

  createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }
}
