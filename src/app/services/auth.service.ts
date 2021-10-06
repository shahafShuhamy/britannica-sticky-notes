import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { concatMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  currentUser = '';
  constructor() { }

  login(username: string, password: string) {
    const result = of(true);
    return timer(3000).pipe(
      concatMapTo(result)
    )
  }

  userLoggedIn(userName:string, value: boolean) {
    this.loggedIn = value;
    if (value) {
      this.currentUser = userName;
      if (this.newUser(userName) ){
        localStorage.setItem(userName, '');
      }
    }
  }

  get currentLoggedInUser() {
    return this.currentUser;
  }
  
  newUser(userName: string): boolean {
    let userStorage = localStorage.getItem(userName);
    return (userStorage === null || '') ? true : false;
  }
}
