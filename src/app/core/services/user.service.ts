import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from './auth.service';
import {User} from '../models/user.models';
import {SignupResponse} from '../models/response/user/signupResponse';
import {RegisterResponse} from '../models/response/user/registerResponse';
import {ResetPasswordResponse} from '../models/response/user/resetPasswordResponse';
import {ConfirmResetPasswordResponse} from '../models/response/user/confirmResetPasswordResponse';

const api = environment.api;

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient, private authService: AuthenticationService) {
    }

    /**
     *  Get all users, api returns array of users
     */
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${api}/home/`);
    }

    /**
     *  Get user by id, api returns single user instance
     */
    getById(id: string): Observable<User> {
        return this.http.get<User>(`${api}/users/${id}`);
    }

    /**
     *  Sign up aka confirm-user
     */
    signup(payload): Observable<User> {
        return this.http
            .post(`${api}/confirm-user/${payload.invite}`, payload.data)
            .pipe(
                map(
                    (response: SignupResponse) => {
                        const currentUser = {...response.user, token: response.token};
                        this.authService.setUser(currentUser);
                        return currentUser;
                    }
                ));
    }

    /**
     *  Register new user aka invite user
     */
    register(payload): Observable<boolean> {
        return this.http
            .post(`${api}/invite-new-user/`, payload.data)
            .pipe(
                map(
                    (response: RegisterResponse) => {
                        if (!response.success) {
                            throwError(response);
                        }
                        return response.success;
                    }
                )
            );
    }

    /**
     *  Get link for reset password on email
     */
    resetPassword(): Observable<boolean> {
        return this.http
            .get(`${api}/change-password-confirm/`)
            .pipe(
                map(
                    (response: ResetPasswordResponse) => response.success
                )
            );
    }

    /**
     *  Change password
     */
    confirmResetPassword(payload): Observable<boolean> {
        return this.http
            .post(`${api}/change-pass/${payload.confirm}`, payload.data)
            .pipe(
                map(
                    (response: ConfirmResetPasswordResponse) => {
                        if (!response.success) {
                            throwError(response);
                        }
                        return response.success;
                    })
            );
    }

    /**
     *  Update profile (current user)
     */
    updateProfile(payload) {
        return this.http
            .put(`${api}/profile/`, payload)
            .pipe(
                map(
                    (response: any) => {
                        const currentUser = this.authService.currentUser();
                        const newUser = response.user;
                        const user = {...currentUser, ...newUser};
                        this.authService.setUser(user);
                        return user;
                    }
                )
            );
    }
}
