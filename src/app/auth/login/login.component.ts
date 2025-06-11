import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(role: 'admin' | 'user'): void {
    console.log('Selected role:', role);
    this.authService.setRole(role);
    this.router.navigate(['/forms']);
  }
}
