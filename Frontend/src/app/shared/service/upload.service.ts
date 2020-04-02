import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient,
    private apiservice: ApiService
  ) { }

  uplodImage(file: any, type: string) {

    return this.http.post<{}>(`${this.apiservice.getUploadUrl()}` + 'uploadImage/' + type, file)
      .pipe(
        catchError(error => throwError(error)),
        map((response: any) => {
          return response;
        })
      );
  }
}
