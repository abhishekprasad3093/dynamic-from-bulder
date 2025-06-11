import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly roleKey = 'user_role';

  setRole(role: 'admin' | 'user') {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): 'admin' | 'user' | null {
    return localStorage.getItem(this.roleKey) as 'admin' | 'user' | null;
  }

  isAuthenticated(): boolean {
    return this.getRole() !== null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
