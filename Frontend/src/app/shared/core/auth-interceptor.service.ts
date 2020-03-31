import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token');

        const authReq = req.clone(
            {
                headers: new HttpHeaders({
                    Authorization: `JWT ${token}`,
                    'Content-Type': 'application/json',
                })
            }
        );
        return next.handle(authReq);
    }

}



// const authReq = req.clone({
//     headers: req.headers.set(

//         'Authorization', 'JWT' + token,

//     )
// });