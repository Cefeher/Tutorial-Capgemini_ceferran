import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private backendUrl = 'http://localhost:8090';



  constructor(
    private http: HttpClient,
    private router: Router
  ) { }



  login(username: string, password: string): Observable<string> {
    const url = `${this.backendUrl}/auth`;
    const body = { username, password };
    return this.http.post<{ token: string }>(url, body).pipe(
      map(response => response.token),
      tap(token => {
        localStorage.setItem('token', token);
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/games']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAdmin(): Observable<boolean> {
    const token = this.getToken();
    return of(true);
  }
}

