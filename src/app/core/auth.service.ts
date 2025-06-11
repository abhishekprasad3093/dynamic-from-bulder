import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AppState } from '../state/app.state';
import { setFields } from '../state/form/form.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AppState>){}
  private roleSubject = new BehaviorSubject<'admin' | 'user' | null>(this.getStoredRole());
  role$ = this.roleSubject.asObservable();

  setRole(role: 'admin' | 'user'): void {
    localStorage.setItem('userRole', role);
    this.roleSubject.next(role);
  }

  getRole(): 'admin' | 'user' | null {
    return this.roleSubject.value;
  }

  private getStoredRole(): 'admin' | 'user' | null {
    return localStorage.getItem('userRole') as 'admin' | 'user' | null;
  }

  logout(): void {
    localStorage.removeItem('formFields');
    this.store.dispatch(setFields({ fields: [] }));
    localStorage.clear();
    sessionStorage.clear();
    this.roleSubject.next(null);
  }
}
