import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';

import {environment} from '../../../environments/environment';
import {AuthenticationService} from './auth.service';
import {User} from '../models/instances/user.models';
import {SignupResponse} from '../models/responses/user/signupResponse';
import {RegisterResponse} from '../models/responses/user/registerResponse';
import {ResetPasswordResponse} from '../models/responses/user/resetPasswordResponse';
import {ConfirmResetPasswordResponse} from '../models/responses/user/confirmResetPasswordResponse';
import {UpdateProfileResponse} from '../models/responses/user/updateProfileResponse';
import {HomeResponse} from '../models/responses/user/homeResponse';
import RequestHandler from '../helpers/request-handler';


const api = environment.api;

@Injectable({providedIn: 'root'})
export class UserService {
    private user$ = new Subject<User>();

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService,
        private requestHandler: RequestHandler,
        public formBuilder: FormBuilder,
    ) {
    }


    /**
     * Returns observable for subscribe
     */
    getObservable(): Observable<User> {
        return this.user$.asObservable();
    }

    /**
     *  Get all users, api returns array of users
     */
    getAll(): Observable<User[]> {
        return this.requestHandler.request(
            `${api}/home/`,
            'get',
            null,
            (response: HomeResponse) => response.data
        );
    }

    /**
     *  Sign up aka confirm-user
     */
    signup(payload) {
        return this.requestHandler.request(
            `${api}/confirm-user/${payload.invite}`,
            'post',
            payload,
            (response: SignupResponse) => {
                this.user = {...response.user, token: response.token};
                return this.user$;
            }
        );
    }

    set user(user: User) {
        this.authService.setUser(user);
        this.user$.next(user);
    }

    /**
     *  Register new user aka invite user
     */
    register(payload): Observable<boolean> {
        return this.requestHandler.request(
            `${api}/invite-new-user/`,
            'post',
            payload,
            (response: RegisterResponse) => response.success
        );
    }

    /**
     *  Get link for reset password on email
     */
    resetPassword(): Observable<boolean> {
        return this.requestHandler.request(
            `${api}/change-password-confirm/`,
            'get',
            null,
            (response: ResetPasswordResponse) => response.success
        );
    }

    /**
     *  Change password
     */
    confirmResetPassword(payload): Observable<boolean> {
        return this.requestHandler.request(
            `${api}/change-pass/${payload.confirm}`,
            'post',
            payload,
            (response: ConfirmResetPasswordResponse) => response.success,
        );
    }

    /**
     *  Update profile (current user)
     */
    updateProfile(payload) {
        return this.requestHandler.request(
            `${api}/profile/`,
            'put',
            payload,
            (response: UpdateProfileResponse) => {
                // returns updated user and store in cookies
                const currentUser = this.authService.currentUser();
                const newUser = response.user;
                this.user = {...currentUser, ...newUser};
                return this.user$;
            }
        );
    }

    initializeForm() {
        return this.formBuilder.group({
            email: [
                '',
                [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
                // [this.isEmailUnique.bind(this), this.isEmailValid.bind(this)]
            ],
        });
    }
}
