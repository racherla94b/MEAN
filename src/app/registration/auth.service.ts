import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from "rxjs";

import { User } from './user.model';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.backendURL + "auth/";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private username: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserName() {
    return this.username;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(user: User) {
    this.http.post<{message: string, token: string, expiresIn: number, username: string, userId: string}>
      (BACKEND_URL + '/login', user)
      .subscribe((responseData) => {
        this.token = responseData.token;
        if(this.token) {
          this.username = responseData.username;
          this.userId = responseData.userId;
          const expiryTime = responseData.expiresIn;
          this.setAuthTimer(expiryTime);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expiresAt = new Date(now.getTime() + expiryTime * 1000);
          console.log(expiresAt);
          this.saveAuthData(this.token, expiresAt);
          this.router.navigate(["/"]);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  signup(user: User) {
    this.http.post(BACKEND_URL + "/signup", user) // http://localhost:3000/auth/signup
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/login"]);
      }, (error) => {
        this.authStatusListener.next(false);
    });
  }

  logout() {
    this.token = null;
    this.username = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
    localStorage.clear();
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiry", expirationDate.toISOString());
    localStorage.setItem("username", this.username);
    localStorage.setItem("userId", this.userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    const expirationDate = localStorage.getItem("expiry");
    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      username: username,
      userId: userId
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.username = authInformation.username;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
}
