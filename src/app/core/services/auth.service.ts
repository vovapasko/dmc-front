import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {CookieService} from '../providers/cookie.service';
import {User} from '../models/instances/user.models';
import {TokenTypes} from '../models/instances/token.model';
import {environment} from '../../../environments/environment';
import {RequestAccessTokenResponse} from '../models/responses/auth/requestAccessTokenResponse';
import {LoginResponse} from '../models/responses/auth/loginResponse';
import {LoginPayload} from '../models/payloads/auth/login';
import {RequestHandler} from '../helpers/request-handler';
import {UserService} from './user.service';
import {ActivatedRoute, Router} from '@angular/router';

const api = environment.api;

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public static readonly REFRESH_TOKEN_NAME = 'refresh';
    public static readonly ACCESS_TOKEN_NAME = 'access';
    public static readonly CURRENT_USER = 'currentUser';

    user: User;
    returnUrl: string;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private requestHandler: RequestHandler,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    /**
     * Get the token (access or refresh) from cookie
     */
    public getToken(type: string): string | null {
        const currentUser = this.userService.currentUser();
        if (currentUser && currentUser.token && type in TokenTypes) {
            return currentUser.token[type];
        }
        return null;
    }

    /**
     * Save the token (access or refresh) in cookie
     */
    public setToken(type: string, value) {
        const currentUser = this.userService.currentUser();
        if (currentUser && currentUser.token && type in TokenTypes) {
            currentUser.token[type] = value;
        }
        this.cookieService.setCookie(AuthenticationService.CURRENT_USER, JSON.stringify(currentUser), 1);
    }

    /**
     * Performs the auth
     */
    login(payload: LoginPayload): Observable<User> {
        return this.requestHandler.request(
            `${api}/login/`,
            'post',
            payload,
            (response: LoginResponse) => {
                const currentUser = {...response.user, token: response.token};
                this.userService.user = currentUser;
                this.router.navigate([this.returnUrl]);
                return currentUser;
            }
        );
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie(AuthenticationService.CURRENT_USER);
        this.userService.user = null;
    }

    /**
     *  Refresh token
     */
    requestAccessToken(): Observable<any> {
        const refreshToken = this.getToken(AuthenticationService.REFRESH_TOKEN_NAME);
        return this.http
            .post(`${api}/token-refresh/`, {refresh: refreshToken})
            .pipe(
                tap(
                    (response: RequestAccessTokenResponse) => this.setToken(AuthenticationService.ACCESS_TOKEN_NAME, response.access)
                ),
                catchError(
                    error => this.unauthorised(error)
                )
            );
    }

    unauthorised = (error) => {
        // auto logout if 401 response returned from api
        this.logout();
        location.reload();
        return throwError({status: 401, error: {message: 'Unauthorised'}});
    }
}

