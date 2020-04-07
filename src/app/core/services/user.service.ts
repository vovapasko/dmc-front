import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';

import {environment} from '../../../environments/environment';
import {User} from '../models/instances/user.models';
import {SignupResponse} from '../models/responses/user/signupResponse';
import {RegisterResponse} from '../models/responses/user/registerResponse';
import {ResetPasswordResponse} from '../models/responses/user/resetPasswordResponse';
import {ConfirmResetPasswordResponse} from '../models/responses/user/confirmResetPasswordResponse';
import {UpdateProfileResponse} from '../models/responses/user/updateProfileResponse';
import {HomeResponse} from '../models/responses/user/homeResponse';
import RequestHandler from '../helpers/request-handler';
import {CookieService} from '../providers/cookie.service';
import {CURRENT_USER} from '../constants/user';
import {PaginationService} from './pagination.service';
import {SignupPayload} from "../models/payloads/user/signup";
import {RegisterPayload} from "../models/payloads/user/register";
import {ActivatedRoute, Router} from "@angular/router";

const api = environment.api;

@Injectable({providedIn: 'root'})
export class UserService {
    public user$ = new BehaviorSubject(new User());

    selectedUser$: BehaviorSubject<User> = new BehaviorSubject(null);
    users$: BehaviorSubject<Array<User>> = new BehaviorSubject([]);
    paginatedUserData$: BehaviorSubject<Array<User>> = new BehaviorSubject([]);

    constructor(
        private http: HttpClient,
        private requestHandler: RequestHandler,
        public formBuilder: FormBuilder,
        private paginationService: PaginationService,
        private cookieService: CookieService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    get selectedUser() {
        return this.selectedUser$.getValue();
    }

    set selectedUser(value: User) {
        this.selectedUser$.next(value);
    }

    get users() {
        return this.users$.getValue();
    }

    set users(value: Array<User>) {
        this.users$.next(value);
    }

    get paginatedUserData() {
        return this.paginatedUserData$.getValue();
    }

    set paginatedUserData(value: Array<User>) {
        this.paginatedUserData$.next(value);
    }

    /**
     *  Get all users, api returns array of users
     */
    getAll(): Observable<User[]> {
        return this.requestHandler.request(
            `${api}/home/`,
            'get',
            null,
            (response: HomeResponse) => {
                const users = response.data;
                this.users = users;
                this.applyPagination();
                return users;
            }
        );
    }

    /**
     *  Sign up aka confirm-user
     */
    signup(payload: SignupPayload) {
        return this.requestHandler.request(
            `${api}/confirm-user/${payload.invite}`,
            'post',
            payload,
            (response: SignupResponse) => {
                this.user = {...response.user, token: response.token};
                this.router.navigate(['/profile']);
                return this.user;
            }
        );
    }

    set user(user: User) {
        this.user$.next(user);
        this.cookieService.setCookie(CURRENT_USER, JSON.stringify(user), 1);
    }

    get user() {
        return this.user$.getValue();
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie(CURRENT_USER));
        }
        return this.user;
    }

    /**
     *  Register new user aka invite user
     */
    register(payload: any): Observable<boolean> {
        return this.requestHandler.request(
            `${api}/invite-new-user/`,
            'post',
            payload,
            (response: RegisterResponse) => {
                this.applyPagination();
                return response.success;
            }
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
            (response: ConfirmResetPasswordResponse) => {
                this.router.navigate(['/account/confirm']);
                return response.success;
            },
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
                const currentUser = this.currentUser();
                const newUser = response.user;
                const user = {...currentUser, ...newUser};
                this.user = user;
                return user;
            }
        );
    }

    initializeInviteUserForm() {
        return this.formBuilder.group({
            email: [
                '',
                [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
                // [this.isEmailUnique.bind(this), this.isEmailValid.bind(this)]
            ],
        });
    }

    initializeProfileForm() {
        const user = this.user;
        return this.formBuilder.group({
            firstName: [user.firstName, [Validators.required]],
            lastName: [user.lastName, [Validators.required]],
            email: [user.email, [Validators.required, Validators.email]],
        });
    }

    selectUser(user: any) {
        this.selectedUser = user;
        return of(user);
    }

    public applyPagination(): void {
        const {paginationService, users} = this;
        paginationService.totalRecords = users;
        paginationService.applyPagination();
        this.paginatedUserData = paginationService.paginatedData;
    }

    public onPageChange(page: number): void {
        const {paginationService} = this;
        paginationService.onPageChange(page);
        this.paginatedUserData = paginationService.paginatedData;
    }
}
