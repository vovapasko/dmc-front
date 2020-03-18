import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CookieService} from './cookie.service';
import {User} from '../models/user.models';
import {TokenTypes} from '../models/token.model';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public static REFRESH_TOKEN_NAME = 'refresh';
    public static ACCESS_TOKEN_NAME = 'access';
    user: User;

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
        }
        return this.user;
    }

    public getToken(type: string): string | null {
        const currentUser = this.currentUser();
        if (currentUser && currentUser.token && type in TokenTypes) {
            return currentUser.token[type];
        }
        return null;
    }

    public setToken(type: string, value) {
        const currentUser = this.currentUser();
        if (currentUser && currentUser.token && type in TokenTypes) {
            currentUser.token[type] = value;
        }
        this.cookieService.setCookie('currentUser', JSON.stringify(currentUser), 1);
        return null;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return this.http.post<any>(`/api/login`, {email, password})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    this.user = user;
                    // store user details and jwt in cookie
                    this.cookieService.setCookie('currentUser', JSON.stringify(user), 1);
                }
                return user;
            }));
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.user = null;
    }

    /**
     *  Refresh token
     */
    requestAccessToken(): Observable<any> {
        const refreshToken = this.getToken(AuthenticationService.REFRESH_TOKEN_NAME);
        return this.http.post('api/auth/refresh', {refresh: refreshToken});
    }
}

