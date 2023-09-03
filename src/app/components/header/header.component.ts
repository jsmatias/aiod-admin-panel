import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  page: string = 'Home';
  constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get user(): string | null {
    return this.authService.user;
  }

  login(): void {
    this.authService.login();
  }
  logout(): void {
    this.authService.logout();
  }
}
