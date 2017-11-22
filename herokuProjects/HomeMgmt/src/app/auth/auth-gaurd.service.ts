import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private auth: Auth, private router: Router ) { 
        console.log( 'AuthGuard.constructor' );
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        console.log( 'AuthGuard.canActivate' );
        if ( this.auth.authenticated() ) {

            console.log('AuthGuard.canActivate.authenticated():'+ this.auth.authenticated() );
            return true;
        } else {
            // Save URL to redirect to after login and fetching profile to get roles
            console.log( 'AuthGuard.canActivate.redirect_url' );
            console.log( 'canActivate.state.url(redirect_url):'+state.url );
            localStorage.setItem( 'redirect_url', state.url );
            this.auth.login();
            console.log( 'canActivate after login() call' );
            this.router.navigate( [''] );
            console.log( 'canActivate after login() and navigate' );
            return false;
        }

    }

}