import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorisationService } from './authentication/authorisation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn: boolean;

  constructor(private auth: AuthorisationService, private router: Router) {
    this.isLoggedIn = false;
  }
  
  login() {
    this.isLoggedIn = true;
    this.router.navigateByUrl('login');

  }

  logout() {
    this.isLoggedIn = false;
    this.auth.logout();
  }
}
