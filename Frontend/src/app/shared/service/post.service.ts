import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) { }
}
