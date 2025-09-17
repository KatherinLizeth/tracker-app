import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // suscribimos para detectar cambios en tiempo real
    this.authService.loggedIn$.subscribe(status => {
      this.loggedIn = status;
      console.log('Estado de sesión actualizado:', status);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}