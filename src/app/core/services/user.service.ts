import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RegisterResponse, ResetResponse, SignupResponse, User} from '../models/user.models';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from './auth.service';

const api = environment.api;

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient, private authService: AuthenticationService) {
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${api}/users`);
    }

    getById(id: string): Observable<User> {
        return this.http.get<User>(`${api}/users/${id}`)
            .pipe(map((response: User) => response));
    }

    signup(payload): Observable<User> {
        return this.http.post(`${api}/confirm-user/${payload.invite}`, payload.data)
            .pipe(map((response: SignupResponse) => {
                const currentUser = {...response.user, token: response.token};
                this.authService.setUser(currentUser);
                return currentUser;
            }));
    }

    register(user: User): Observable<boolean> {
        return this.http.post(`${api}/invite-new-user`, user)
            .pipe(map((response: RegisterResponse) => response.status));
    }

    resetPassword(user: User): Observable<boolean> {
        return this.http.post(`${api}/change-pass`, user)
            .pipe(map((response: ResetResponse) => response.status));
    }

    confirmResetPassword(user: User): Observable<boolean> {
        return this.http.post(`${api}/change-password-confirm`, user)
            .pipe(map((response: ResetResponse) => response.status));
    }
}
