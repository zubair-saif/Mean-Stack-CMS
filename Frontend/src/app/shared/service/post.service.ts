import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  createPost(body) {
    console.log(body);
    return this.apiService.post('/createpost', body);
  }
  editPost(id, data) {
    return this.apiService.put('/updatepost/' + id, data);
  }
  getpostByUserId(data) {
    return this.apiService.get('/my-post', data);
  }
  updatePostbyId(id) {
    return this.apiService.get('/getsinglepost/' + id);
  }
}
