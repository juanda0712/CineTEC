import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  private static instanceCounter = 0;

  constructor() {
    AuthService.instanceCounter++;
    console.log(
      `AuthService instance created (${AuthService.instanceCounter} instances)`
    );
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    //this.isLoggedIn = false;
  }
}
