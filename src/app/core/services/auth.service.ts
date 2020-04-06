import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {CookieService} from '../providers/cookie.service';
import {User} from '../models/instances/user.models';
import {TokenTypes} from '../models/instances/token.model';
import {environment} from '../../../environments/environment';
import {RequestAccessTokenResponse} from '../models/responses/auth/requestAccessTokenResponse';
import {LoginResponse} from '../models/responses/auth/loginResponse';
import {LoginPayload} from '../models/payloads/auth/login';
import RequestHandler from '../helpers/request-handler';

const api = environment.api;

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public static readonly REFRESH_TOKEN_NAME = 'refresh';
    public static readonly ACCESS_TOKEN_NAME = 'access';
    public static readonly CURRENT_USER = 'currentUser';

    user: User;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private requestHandler: RequestHandler
    ) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie(AuthenticationService.CURRENT_USER));
        }
        return this.user;
    }

    /**
     * Get the token (access or refresh) from cookie
     */
    public getToken(type: string): string | null {
        const currentUser = this.currentUser();
        if (currentUser && currentUser.token && type in TokenTypes) {
            return currentUser.token[type];
        }
        return null;
    }

    /**
     * Save the token (access or refresh) in cookie
     */
    public setToken(type: string, value) {
        const currentUser = this.currentUser();
        if (currentUser && currentUser.token && type in TokenTypes) {
            currentUser.token[type] = value;
        }
        this.cookieService.setCookie(AuthenticationService.CURRENT_USER, JSON.stringify(currentUser), 1);
        return null;
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
                this.setUser(currentUser);
                return currentUser;
            }
        );
    }

    /**
     * Save the user in cookie
     */
    setUser(user: User) {
        this.user = user;
        // store user details and jwt in cookie
        this.cookieService.setCookie(AuthenticationService.CURRENT_USER, JSON.stringify(user), 1);
        return this.user;
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie(AuthenticationService.CURRENT_USER);
        this.user = null;
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

