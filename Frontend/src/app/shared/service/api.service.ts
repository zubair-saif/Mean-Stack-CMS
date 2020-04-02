import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    ApiUrl: string = environment.baseUrl;
    params: HttpParams = new HttpParams();
    body: object = {};

    constructor(private http: HttpClient) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }
    get(path: string, params?): Observable<any> {

        return this.http.get(`${this.ApiUrl}${path}`, { params })
            .pipe(catchError(this.formatErrors));

    }
    put(path: string, body): Observable<any> {
        return this.http.put(`${this.ApiUrl}${path}`, JSON.stringify(body))
            .pipe(catchError(this.formatErrors));
    }
    post(path: string, body): Observable<any> {

        return this.http.post(`${this.ApiUrl}${path}`, JSON.stringify(body))
            .pipe(catchError(this.formatErrors));
    }
    delete(path: string): Observable<any> {
        return this.http.delete(`${this.ApiUrl}${path}`)
            .pipe(catchError(this.formatErrors));
    }
    getUser(data): Observable<any> {
        return this.http.get(`${this.ApiUrl}/verify-jwt`);
    }
    public getUploadUrl() {

        return this.ApiUrl + '/upload/';
    }
    public getPublicImageUrl() {
        return this.ApiUrl + + '/media/uploads';

    }
}
