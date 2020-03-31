import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Users } from '@models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  register(user: Users): Observable<Users> {
    return this.apiService.post('/signup', user);
  }
  login(userInfo): Observable<any> {
    return this.apiService.post('/signin', userInfo);
  }


}
