import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.authService.isLoggedIn()
            .pipe(
                tap((verify) => {
                    if (!verify) {
                        this.router.navigate(['./games'])
                    }
                })
            )
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

        return this.authService.isLoggedIn()
            .pipe(
                tap((verify) => {
                    if (!verify) {
                        this.router.navigate(['./games'])
                    }
                })
            )

    }
}