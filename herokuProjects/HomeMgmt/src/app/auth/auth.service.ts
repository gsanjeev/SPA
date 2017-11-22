import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { myConfig } from './auth.config';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
//import WebAuth from 'auth0-js';
//import * as Auth0 from 'auth0-js';
import Auth0Lock from "auth0-lock";


// Avoid name not found warnings
//let Auth0: any = require( 'auth0-js' ).default;
//var Auth0 = require( 'auth0-js' );
//var Auth0Lock = require( 'auth0-lock' ).default;

@Injectable()
export class Auth {
    // Configure Auth0


    lock: Auth0LockStatic;
    /*    lock = new Auth0Lock( myConfig.clientID, myConfig.domain, {
            defaultDatabaseConnection: 'HomeMgmt',
            autoclose: true,
            rememberLastLogin: false,
            theme: {
                logo: "https://homemgmt.herokuapp.com/assets/home.jpg",
                primaryColor: "#ADD8E6",
                labeledSubmitButton: false,
            },
            languageDictionary: {
                title: "HMS"
            }
        });*/

    // auth0 = new Auth0.WebAuth( { clientID: myConfig.clientID, domain: myConfig.domain });
    //Store profile object in auth class
    userProfile: any;

    constructor( private router: Router ) {
        console.log( 'Auth.constructor:' );
        let options = {
            defaultDatabaseConnection: 'HomeMgmt',
            autoclose: true,
            rememberLastLogin: false,
            theme: {
                labeledSubmitButton: false,
                logo: "https://homemgmt.herokuapp.com/assets/home.jpg",
                primaryColor: "green",
            },
            languageDictionary: {
                title: "HMS"
            }
        };
        this.lock = new Auth0Lock( myConfig.clientID, myConfig.domain, options );
        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse( localStorage.getItem( 'profile' ) );
        console.log( 'Auth.1.constructor.userProfile:' + this.userProfile );
        console.log( 'Auth.1.constructor.redirect_url:' + localStorage.getItem( 'redirect_url' ) );

        /*        this.lock.resumeAuth( window.location.hash, ( error, authResult ) => {
                    if ( error ) {
                        alert( "Could not parse hash" );
                    }
                    console.log( authResult.accessToken );
                });*/
        console.log( 'Auth.Going to call router.events.filter(event)' );
        //this.router.events.filter( event => event.constructor.name === 'NavigationStart' )
        this.router.events.filter( event => ( /access_token|id_token|error/ ).test( event.url ) )
            .subscribe(( event ) => {
                console.log( 'Auth.resumeAuth.Going to call this.lock.on(resumeAuth)' );
                console.log( 'Auth.resumeAuth.event' + event );

                this.lock.resumeAuth( window.location.hash, ( error, authResult ) => {
                    if ( error ) {
                        console.log( 'Auth.resumeAuth:' + error );
                        alert( "Auth.resumeAuth.Could not parse hash" );
                    }
                    console.log( 'Auth.resumeAuth.authResult:' + authResult );
                    if ( authResult != null ) {
                        localStorage.setItem( 'id_token', authResult.idToken );
                        console.log( 'Auth.resumeAuth:' + authResult.idToken );
                        // Fetch profile information
                        this.lock.getProfile( authResult.idToken, ( error, profile ) => {
                            if ( error ) {
                                // Handle error
                                console.log( 'Auth.resumeAuth.getProfile:error:' + error );
                                alert( "Auth.resumeAuth.getProfile:error" );
                                return;
                            }
                            this.userProfile = profile;
                            console.log( 'Auth.constructor.resumeAuth getProfile.idToken|' + authResult.idToken + '|' );
                            localStorage.setItem( 'id_token', authResult.idToken );
                            console.log( 'Auth.2.constructor.resumeAuth.userProfile:' + JSON.stringify( profile ) );
                            localStorage.setItem( 'profile', JSON.stringify( profile ) );


                            // Redirect to the saved URL, if present.
                            var redirectUrl: string = localStorage.getItem( 'redirect_url' );
                            if ( redirectUrl != undefined ) {
                                console.log( 'Auth.2.constructor.redirect_url:' + redirectUrl );
                                localStorage.removeItem( 'redirect_url' );
                                this.router.navigate( [redirectUrl] );
                            }
                        });
                    }
                    //this.router.navigate( ['/'] );
                });
            });

        // Add callback for the Lock `authenticated` event
        /*        console.log( 'Going to call this.lock.on(authenticated)' );
                this.lock.on( "authenticated", ( authResult ) => {
                    console.log( 'inside this.lock.on(authenticated)' );
        
                });
                this.lock.on( 'authorization_error', authResult => {
                    console.log( 'constructor.authorization_error:' + authResult );
                });*/

        //this.wait( 8000 );
        console.log( 'Auth.End Auth Constructor...' );
        //this.handleRedirectWithHash();
    }

    public login() {
        // Call the show method to display the widget.
        console.log( 'Auth.login()' );
        this.lock.show();
    }

    public authenticated() {
        console.log( 'Auth:authenticated()......:' + tokenNotExpired() );
        //console.log( tokenNotExpired() );
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token and profile from localStorage
        localStorage.removeItem( 'id_token' );
        localStorage.removeItem( 'profile' );
        this.userProfile = undefined;
    }

    private wait( timeInMS ) {
        var counter = 0
            , start = new Date().getTime()
            , end = 0;
        while ( counter < timeInMS ) {
            end = new Date().getTime();
            counter = end - start;
        }
    }

    /*        private handleRedirectWithHash() {
                this.router.events.take( 1 ).subscribe( event => {
                    if ( /access_token/.test( event.url ) || /error/.test( event.url ) ) {
        
                        let authResult = this.auth0.parseHash( window.location.hash );
        
                        if ( authResult && authResult.idToken ) {
                            this.lock.emit( 'authenticated', authResult );
                        }
        
                        if ( authResult && authResult.error ) {
                            this.lock.emit( 'authorization_error', authResult );
                        }
                    }
                });
            }*/
}

