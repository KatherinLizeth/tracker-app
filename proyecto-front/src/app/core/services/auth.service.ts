import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/token/';
  private tokenKey = 'access_token';
  private registerUrl = 'http://localhost:8000/api/register/';

  // Manejo reactivo del estado de sesión
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ======== LOGIN ========
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  register(username: string, password: string, companyId: number): Observable<any> {
    return this.http.post<any>(this.registerUrl, { 
      username, 
      password,
      company: companyId 
    });
  }

  // ======== TOKEN ========
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedInSubject.next(true); //  tiempo real
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInSubject.next(false); //tiempo real
  }

  // ======== VALIDAR TOKEN EXISTENTE ========
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}