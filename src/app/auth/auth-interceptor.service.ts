import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                console.log(user);
                // console.log("token = " + user.token);
                const localUser = JSON.parse(localStorage.getItem("userData"))
                if (!user) {
                    return next.handle(req)
                }

                const modifiedReq = req.clone({
                    headers: new HttpHeaders({
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }),
                    params: new HttpParams().set('auth', user.token)
                })
                return next.handle(modifiedReq);
            })
        )
    }
}
