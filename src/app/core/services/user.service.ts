import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from '@models/instances/user.models';
import { SignupResponse } from '@models/responses/user/signup';
import { RegisterResponse } from '@models/responses/user/register';
import { ResetPassword } from '@models/responses/user/reset-password';
import { ConfirmResetPasswordResponse } from '@models/responses/user/confirm-reset-password';
import { UpdateProfileResponse } from '@models/responses/user/update-profile';
import { GetAllResponse } from '@models/responses/user/get-all';
import { RequestHandler } from '@helpers/request-handler';
import { CookieService } from '../providers/cookie.service';
import { CURRENT_USER } from '@constants/user';
import { PaginationService } from './pagination.service';
import { SignupPayload } from '@models/payloads/user/signup';
import { DeleteResponse } from '@models/responses/user/delete';
import { UpdateResponse } from '@models/responses/user/update';
import { RegisterPayload } from '@models/payloads/user/register';
import { DeleteUserPayload } from '@models/payloads/user/delete';
import { UpdatePayload } from '@models/payloads/user/update';
import { UpdateProfilePayload } from '@models/payloads/user/update-profile';
import { ConfirmResetPasswordPayload } from '@models/payloads/user/confirm-reset-password';
import { ManageGroups } from '@models/instances/groups';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';

const api = environment.api;

/**
 * This service for handle actions with user, store, pagination, CRUD
 */

@Injectable({ providedIn: 'root' })
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

  set selectedUser(value: User) {
    this.selectedUser$.next(value);
  }

  get users() {
    return this.users$.getValue();
  }

  set users(value: Array<User>) {
    this.users$.next(value);
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
  public getAll(page = 1): Observable<User[]> {
    return this.requestHandler.request(`${api}/${endpoints.USERS}/?page=${page}`,
      methods.GET,
      null,
      (response: GetAllResponse) => {
        if (response && response.results) {
          const users = response.results;
          this.users = users;
          this.paginationService.totalSize = response.count;
          this.paginationService.page = page;
          return users;
        }
      });
  }

  /**
   *  Sign up aka confirm-user
   */
  public signup(payload: SignupPayload): Observable<User> {
    return this.requestHandler.request(
      `${api}/${endpoints.CONFIRM_USER}/${payload.invite}`,
      methods.POST,
      payload,
      (response: SignupResponse) => {
        if (response && response.user) {
          this.user = { ...response.user, token: response.token };
          this.router.navigate(['/profile']);
          return this.user;
        }
      }
    );
  }

  /**
   * Returns the current user
   */
  public loadCurrentUser(): User {
    if (!this.user) {
      this.user = JSON.parse(this.cookieService.getCookie(CURRENT_USER));
    }
    return this.user;
  }

  /**
   *  Register new user aka invite user
   */
  public register(payload: RegisterPayload): Observable<User> {
    return this.requestHandler.request(`${api}/${endpoints.INVITE_NEW_USER}/`, methods.POST, payload, (response: RegisterResponse) => {
      if (response && response.user) {
        const user = response.user;
        const users = this.users;
        this.users = [...users, user];
        return response.user;
      }
    });
  }

  /**
   *  Delete user
   */
  public delete(payload: DeleteUserPayload): Observable<DeleteUserPayload> {
    return this.requestHandler.request(`${api}/${endpoints.USERS}/${payload.id}`, methods.DELETE, payload, (response: DeleteResponse) => {
      const users = this.users;
      this.users = users.filter((el) => +el.id !== +payload.id);
      return payload;
    });
  }

  /**
   *  Delete user
   */
  public update(payload: UpdatePayload): Observable<User> {
    return this.requestHandler.request(
      `${api}/${endpoints.CHANGE_GROUP}/${payload.id}`,
      methods.PUT,
      payload,
      (response: UpdateResponse) => {
        if (response.message.user) {
          const user = response.message.user;
          this.users = this.users.map((el) => (+el.id === +payload.id ? user : el));
          return user;
        }
      }
    );
  }

  /**
   *  Get link for reset password on email
   */
  public resetPassword(): Observable<boolean> {
    return this.requestHandler.request(`${api}/${endpoints.CHANGE_PASSWORD_CONFIRM}/`, methods.GET, null, (response: ResetPassword) => {
      if (response) {
        return response.success;
      }
    });
  }

  /**
   *  Change password
   */
  public confirmResetPassword(payload: ConfirmResetPasswordPayload): Observable<boolean> {
    return this.requestHandler.request(
      `${api}/${endpoints.CHANGE_PASS}/${payload.confirm}`,
      methods.POST,
      payload,
      (response: ConfirmResetPasswordResponse) => {
        this.router.navigate(['/account/confirm']);
        return response.success;
      }
    );
  }

  /**
   *  Update profile (current user)
   */
  public updateProfile(payload: UpdateProfilePayload): Observable<User> {
    return this.requestHandler.request(
      `${api}/${endpoints.PROFILE}/${payload.id}`,
      methods.PUT,
      payload,
      (response: UpdateProfileResponse) => {
        if (response) {
          const currentUser = this.loadCurrentUser();
          const user = { ...currentUser, ...response };
          this.user = user;
          return user;
        }
      });
  }

  public initializeInviteUserForm(): FormGroup {
    return this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]
        // [this.isEmailUnique.bind(this), this.isEmailValid.bind(this)]
      ]
    });
  }

  public initializeProfileForm(): FormGroup {
    const user = this.user;
    return this.formBuilder.group({
      firstName: [user ? user.firstName : null, [Validators.required]],
      lastName: [user ? user.lastName : null, [Validators.required]],
      email: [user ? user.email : null, [Validators.required, Validators.email]]
    });
  }

  public belongToManage(user: User): boolean {
    if (!user || (user && !user.groups)) {
      return;
    }
    return !!user.groups.find((group) => ManageGroups.indexOf(group.name) !== -1);
  }

  public selectUser(user: User): Observable<User> {
    this.selectedUser = user;
    return of(user);
  }

  public onPageChange(page: number): void {
    this.getAll(page);
  }
}
