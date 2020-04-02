
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserProfileService } from '@shared/service';
import { AuthData } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthancated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListner = new Subject<boolean>();
  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserProfileService
  ) {
    this.autoAuthUser();
  }

  getToken() {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }
  getIsAuth() {
    return this.isAuthancated;
  }
  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }

  login(users) {

    this.userService.login(users).subscribe(res => {
      const token = res.token;
      this.token = token;
      if (token) {

        this.isAuthancated = true;
        this.userId = res.userData._id;
        this.authStatusListner.next(true);
        this.setToken(token, this.userId);
        this.router.navigate(['my-profile']);

      }
    });
  }

  private setToken(token: string, userId: string) {

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }
  private getAutToken() {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      return;
    }
    return {
      token,
      userId
    };
  }

  private clearToken() {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  autoAuthUser() {

    const authInformation = this.getAutToken();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthancated = true;
    this.userId = authInformation.userId;
    this.authStatusListner.next(true);
  }

  logout() {

    this.token = null;
    this.userId = null;
    this.isAuthancated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearToken();
    this.router.navigate(['/']);

  }

  register(data) {
    this.userService.register(data).subscribe(res => {
      console.log(res);
      return this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }
}
