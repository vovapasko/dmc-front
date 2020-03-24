import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from './auth.service';
import {User} from '../models/instances/user.models';
import {SignupResponse} from '../models/responses/user/signupResponse';
import {RegisterResponse} from '../models/responses/user/registerResponse';
import {ResetPasswordResponse} from '../models/responses/user/resetPasswordResponse';
import {ConfirmResetPasswordResponse} from '../models/responses/user/confirmResetPasswordResponse';
import {UpdateProfileResponse} from '../models/responses/user/updateProfileResponse';
import {HomeResponse} from '../models/responses/user/homeResponse';
import {NotificationService} from './notification.service';

const api = environment.api;

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient, private authService: AuthenticationService, private notificationService: NotificationService) {
    }

    /**
     *  Get all users, api returns array of users
     */
    getAll(): Observable<User[]> {
        return this.http
            .get(`${api}/home/`)
            .pipe(
                map(
                    (response: HomeResponse) => response.data
                )
            );
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
                    (response: RegisterResponse) => this.handleResponse(response)
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
                    (response: ResetPasswordResponse) => this.handleResponse(response)
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
                    (response: ConfirmResetPasswordResponse) => this.handleResponse(response))
            );
    }

    /**
     *  Update profile (current user)
     */
    updateProfile(payload) {
        return this.http
            .put(`${api}/profile/`, payload.data)
            .pipe(
                map(
                    (response: UpdateProfileResponse) => {

                        // notify about success
                        this.notifySuccess(response);

                        // returns updated user and store in cookies
                        const currentUser = this.authService.currentUser();
                        const newUser = response.user;
                        const user = {...currentUser, ...newUser};
                        this.authService.setUser(user);

                        return user;
                    }
                )
            );
    }

    private handleResponse(response) {
        // notify about success
        this.notifySuccess(response);

        // returns successful
        return response.success;
    }

    private notifySuccess(response) {
        if (response.success) {
            return this.notificationService.success('Successful', response.message.message);
        }
        return null;
    }
}
