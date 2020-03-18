import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RegisterResponse, ResetResponse, SignupResponse, User} from '../models/user.models';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`/api/login`);
    }

    getById(id: string): Observable<User> {
        return this.http.get<User>(`/api/users/${id}`)
            .pipe(map((response: User) => response));
    }

    signup(payload): Observable<User> {
        return this.http.post(`api/confirm-user/${payload.invite}`, payload.data)
            .pipe(map((response: SignupResponse) => {
                return {...response.user, token: response.token};
            }));
    }

    register(user: User): Observable<boolean> {
        return this.http.post(`api/register`, user)
            .pipe(map((response: RegisterResponse) => response.status));
    }

    resetPassword(user: User): Observable<boolean> {
        return this.http.post(`api/reset`, user)
            .pipe(map((response: ResetResponse) => response.status));
    }
}
