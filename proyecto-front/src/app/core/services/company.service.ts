import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../../shared/models/company.model';
import { environment } from '../../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/companies/`;
  //private apiUrl = 'http://localhost:8000/api/companies/';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }
}
