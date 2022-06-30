import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from '@apollo/client';
import * as auth0 from 'auth0-js';
import { environment } from 'client/src/environments/environment';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  public user$ = new BehaviorSubject<any>(null);
  public token = new BehaviorSubject<string>('');

  auth0 = new auth0.WebAuth({
    clientID: 'LegolJ9MALz1tsqIzTrGwKnThhOb1RBk',
    domain: 'dev-bitgs785.us.auth0.com',
    responseType: 'token id_token',
    redirectUri: environment.auth0.redirectUri,
    scope: 'openid profile email offline_access',
    // audience: 'http://hasura.io/learn'
  });

  constructor(public router: Router) { 
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(username: string, password: string): void {
    this.auth0.login({username, password}, (err, response) => {
      if (err) {
        alert(`${err.error_description}`);
      }
    });
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: 'google-oauth2'
    })
  }

  public signUp(email: string, password: string) {
    this.auth0.signup({email, password, connection: 'Username-Password-Authentication'}, (err, result) => {
        if (err?.statusCode === 400) {
          alert('Email already exists. Try a different email');
        }
    })
  }

  public handleAuthentication(): any {
    this.auth0.parseHash((err: any, authResult: any) => {
      console.log('Result:', authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.user$.next(authResult.idTokenPayload);
        this.token.next(authResult.idToken);
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/login']);
        console.log(err);
      }
    })
  }


  public setSession(authResult: any): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', authResult.idTokenPayload.exp);
    localStorage.setItem('user_id', authResult.idTokenPayload.sub);
    localStorage.setItem('nonce', authResult.idTokenPayload.nonce);

    const expiresAt = (authResult.idTokenPayload.exp * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        console.log('Renew:', authResult);
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.user$.next(authResult.idTokenPayload);
          this.token.next(authResult.idToken);
          this.setSession(authResult);
          return resolve({token: authResult.idToken});
        } else if (err) {
          alert(`Could not get a new token (${err.error})`);
          this.logout();
          return reject();
        }
      })
    })
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.clear();
    sessionStorage.clear();
    this.auth0.logout({
      clientID: 'LegolJ9MALz1tsqIzTrGwKnThhOb1RBk',
      returnTo: environment.auth0.logoutRedirectUri
    });
   
  }

  public isAuthenticated(): any {
    return localStorage.getItem('id_token') !== undefined && localStorage.getItem('id_token') !== null;
  }
}
