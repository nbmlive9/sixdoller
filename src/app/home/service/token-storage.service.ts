import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
// const SECRET_KEY = 'SUDHEER';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  user: any | null;
  token: any;

  constructor(private router: Router) {
    this.getUser();
    this.token = localStorage.getItem(TOKEN_KEY);
  }

  signOut() {
    this.user = null;
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    this.token = token;
  }

  // public getToken(): string | null {
  //   return this.token;
  // }

  public getToken(): string | null {
    const token = this.token;
    // console.log('Token retrieved:', token);
    return token;
  }

  public saveUser(user: any): void {
    this.user = user;
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    this.user = user ? JSON.parse(user) : null;
    return this.user;
  }

  isLogged() {
    return this.user ? true : false;
  }


isUser() {
  this.user = this.getUser();
  return this.user ;
}



}
