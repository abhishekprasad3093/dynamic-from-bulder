import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  role: string | null = null;
  theme: 'light' | 'dark' = 'light';

  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
    const savedTheme = localStorage.getItem('theme');
    this.theme = (savedTheme as 'light' | 'dark') || 'light';
    this.applyTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  applyTheme() {
    const classList = this.renderer.selectRootElement('body', true).classList;
    classList.remove('light-theme', 'dark-theme');
    classList.add(`${this.theme}-theme`);
  }
}
