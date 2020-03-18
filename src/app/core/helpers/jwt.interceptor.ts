import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
import {CookieService} from '../services/cookie.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthenticationService, public cookieService: CookieService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.indexOf('refresh') !== -1) {
            return next.handle(request);
        }

        const accessToken = this.authService.getToken(AuthenticationService.ACCESS_TOKEN_NAME);
        const refreshToken = this.authService.getToken(AuthenticationService.REFRESH_TOKEN_NAME);

        if (!accessToken && !refreshToken) {
            return next.handle(request);
        }
        if (!accessToken && refreshToken) {
            if (!this.refreshTokenInProgress) {
                this.refreshTokenInProgress = true;
                this.refreshTokenSubject.next(null);
                return next.handle(this.injectToken(request));
                // return this.authService.requestAccessToken().pipe(
                //     switchMap((authResponse) => {
                //         this.authService.setToken(AuthenticationService.ACCESS_TOKEN_NAME, authResponse.access);
                //         this.refreshTokenInProgress = false;
                //         this.refreshTokenSubject.next(authResponse.access);
                //         return next.handle(this.injectToken(request));
                //     }),
                // );
            } else {
                return this.refreshTokenSubject.pipe(
                    filter(result => result !== null),
                    take(1),
                    switchMap((res) => {
                        return next.handle(this.injectToken(request));
                    })
                );
            }
        }

        if (accessToken) {
            return next.handle(this.injectToken(request));
        }
    }

    injectToken(request: HttpRequest<any>) {
        const token = this.authService.getToken(AuthenticationService.ACCESS_TOKEN_NAME);
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
