import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/auth.service';
import {Observable, BehaviorSubject, Subject, throwError} from 'rxjs';
import {switchMap, take, filter, catchError} from 'rxjs/operators';
import {CookieService} from '../services/cookie.service';

const tokenFreeUrl = ['login', 'confirm-user', 'token-refresh'];

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthenticationService, public cookieService: CookieService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // @ts-ignore
        return next
            .handle(this.injectToken(request))
            .pipe(
                catchError(error => {
                        if (error instanceof HttpErrorResponse && error.status === 401) {
                            return this.refreshToken(request, next);
                        } else {
                            return throwError(error);
                        }
                    }
                )
            );
    }

    public refreshToken = (request, next) => {
        if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            return this.authService
                .requestAccessToken()
                .pipe(
                    switchMap(
                        (authResponse: any) => {
                            this.refreshTokenInProgress = false;
                            this.refreshTokenSubject.next(authResponse.access);
                            return next.handle(this.injectToken(request));
                        }
                    )
                );
        } else {
            return this.refreshTokenSubject
                .pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(
                        (res) => {
                            return next.handle(this.injectToken(request));
                        }
                    )
                );
        }
    }

    belongToTokenUrls(url) {
        return !!tokenFreeUrl.filter(el => url.indexOf(el) !== -1).length;
    }

    injectToken(request: HttpRequest<any>) {
        const token = this.authService.getToken(AuthenticationService.ACCESS_TOKEN_NAME);

        if (token && this.belongToTokenUrls(request.url)) {
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return request;
    }
}
