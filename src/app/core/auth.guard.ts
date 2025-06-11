import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'] || [];
    const userRole = sessionStorage.getItem('role');

    if (!userRole || (expectedRoles.length && !expectedRoles.includes(userRole))) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
