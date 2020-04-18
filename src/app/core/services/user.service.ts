import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {User} from '../models/instances/user.models';
import {SignupResponse} from '../models/responses/user/signupResponse';
import {RegisterResponse} from '../models/responses/user/registerResponse';
import {ResetPasswordResponse} from '../models/responses/user/resetPasswordResponse';
import {ConfirmResetPasswordResponse} from '../models/responses/user/confirmResetPasswordResponse';
import {UpdateProfileResponse} from '../models/responses/user/updateProfileResponse';
import {GetAllResponse} from '../models/responses/user/getAllResponse';
import {RequestHandler} from '../helpers/request-handler';
import {CookieService} from '../providers/cookie.service';
import {CURRENT_USER} from '../constants/user';
import {PaginationService} from './pagination.service';
import {SignupPayload} from '../models/payloads/user/signup';
import {DeleteResponse} from '../models/responses/user/deleteResponse';
import {UpdateResponse} from '../models/responses/user/updateResponse';
import {RegisterPayload} from '../models/payloads/user/register';
import {DeletePayload} from '../models/payloads/user/delete';
import {UpdatePayload} from '../models/payloads/user/update';
import {UpdateProfilePayload} from '../models/payloads/user/updateProfile';
import {ConfirmResetPasswordPayload} from '../models/payloads/user/confirmResetPassword';
import {ManageGroups} from '../models/instances/groups';

const api = environment.api;

/**
 * This service for handle actions with user, store, pagination, CRUD
 */

@Injectable({providedIn: 'root'})
export class UserService {
    public user$ = new BehaviorSubject(null);

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

    set user(user: User) {
        this.user$.next(user);
        this.cookieService.setCookie(CURRENT_USER, JSON.stringify(user), 1);
    }

    get user() {
        return this.user$.getValue();
    }

    /**
     *  Get all users, api returns array of users
     */
    getAll(): Observable<User[]> {
        return this.requestHandler.request(
            `${api}/users/`,
            'get',
            null,
            (response: GetAllResponse) => {
                if (response && response.data) {
                    const users = response.data;
                    this.users = users;
                    this.applyPagination();
                    return users;
                }
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
                if (response && response.user) {
                    this.user = {...response.user, token: response.token};
                    this.router.navigate(['/profile']);
                    return this.user;
                }
            }
        );
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
    register(payload: RegisterPayload): Observable<User> {
        return this.requestHandler.request(
            `${api}/invite-new-user/`,
            'post',
            payload,
            (response: RegisterResponse) => {
                if (response && response.user) {
                    this.applyPagination();
                    return response.user;
                }
            }
        );
    }

    /**
     *  Delete user
     */
    delete(payload: DeletePayload): Observable<User> {
        return this.requestHandler.request(
            `${api}/users/${payload.id}`,
            'delete',
            payload,
            (response: DeleteResponse) => {
                const users = this.users;
                this.users = users.filter(el => +el.id !== +payload.id);
                this.applyPagination();
                return payload;
            }
        );
    }

    /**
     *  Delete user
     */
    update(payload: UpdatePayload): Observable<User> {
        return this.requestHandler.request(
            `${api}/change-group/${payload.id}`,
            'put',
            payload,
            (response: UpdateResponse) => {
                if (response.message.user) {
                    const user = response.message.user;
                    this.users = this.users.map(el => +el.id === +payload.id ? user : el);
                    this.applyPagination();
                    return user;
                }
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
            (response: ResetPasswordResponse) => {
                if (response) {
                    return response.success;
                }
            }
        );
    }

    /**
     *  Change password
     */
    confirmResetPassword(payload: ConfirmResetPasswordPayload): Observable<boolean> {
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
    updateProfile(payload: UpdateProfilePayload) {
        return this.requestHandler.request(
            `${api}/profile/`,
            'put',
            payload,
            (response: UpdateProfileResponse) => {
                if (response && response.user) {
                    const currentUser = this.currentUser();
                    const newUser = response.user;
                    const user = {...currentUser, ...newUser};
                    this.user = user;
                    return user;
                }
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

    belongToManage(user: User) {
        return !!user.groups.find(group => ManageGroups.indexOf(group.name) !== -1);
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
