import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

import { CookieService } from '../providers/cookie.service';
import { User } from '@models/instances/user.models';
import { Token, TokenTypes } from '@models/instances/token.model';
import { environment } from '../../../environments/environment';
import { RequestAccessTokenResponse } from '@models/responses/auth/request-access-token-response';
import { LoginResponse } from '@models/responses/auth/login-response';
import { LoginPayload } from '@models/payloads/auth/login';
import { RequestHandler } from '@helpers/request-handler';
import { UserService } from './user.service';
import { CURRENT_USER } from '@constants/user';
import { errorMessages, errors, errorTitle } from '@constants/error';
import numbers from '@constants/numbers';
import { urls } from '@constants/urls';
import { methods } from '@constants/methods';
import { NotificationService } from '@services/notification.service';
import { ForgotPasswordPayload } from '@models/payloads/auth/forgot-password';
import { ForgotPasswordConfirmPayload } from '@models/payloads/auth/forgot-password-confirm';
import { DEFAULT_INTERRUPTSOURCES, Idle } from 'ng2-idle-core';

const api = environment.api;

/**
 * This service for authentication
 */

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public static readonly REFRESH_TOKEN_NAME = TokenTypes.refresh;
  public static readonly ACCESS_TOKEN_NAME = TokenTypes.access;

  user: User;
  returnUrl: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private requestHandler: RequestHandler,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private idle: Idle
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || urls.ROOT;
  }

  /**
   * Get the token (access or refresh) from cookie
   */
  public getToken(type: TokenTypes): string | null {
    const currentUser = this.userService.loadCurrentUser();
    if (currentUser && currentUser.token) {
      return currentUser.token[type];
    }
    return null;
  }

  /**
   * Save the token (access or refresh) in cookie
   */
  public setToken(type: TokenTypes, value: string): void {
    const currentUser = this.userService.loadCurrentUser();
    if (currentUser && currentUser.token) {
      currentUser.token[type] = value;
    }
    this.cookieService.setCookie(CURRENT_USER, JSON.stringify(currentUser), numbers.one);
  }

  /**
   * Performs the auth
   */
  public login(payload: LoginPayload): Observable<User> {
    return this.requestHandler.request(
      `${api}/${urls.LOGIN}/`,
      methods.POST,
      payload,
      (response: LoginResponse) => {
        const currentUser = { ...response.user, token: response.token };
        this.userService.user = currentUser;
        this.router.navigate([this.returnUrl]);
        this.idle.watch();
        return currentUser;
      });
  }

  /**
   * Performs forgot password
   */
  public forgotPassword(payload: ForgotPasswordPayload): Observable<ForgotPasswordPayload> {
    return this.requestHandler.request(
      `${api}/${urls.FORGOT_PASSWORD}/`,
      methods.POST,
      payload,
      (response: null) => {
        return payload;
      });
  }


  /**
   * Performs forgot password
   */
  public forgotPasswordConfirm(payload: ForgotPasswordConfirmPayload): Observable<ForgotPasswordConfirmPayload> {
    return this.requestHandler.request(
      `${api}/${urls.FORGOT_PASSWORD_CONFIRM}/`,
      methods.POST,
      payload,
      (response: null) => {
        return payload;
      });
  }

  /**
   * Logout the user
   */
  public logout(): void {
    // remove user from local storage to log user out
    this.idle.stop();
    this.cookieService.deleteCookie(CURRENT_USER);
    this.userService.user = null;
    this.notificationService.history = [];
    this.notificationService.notifications = [];
  }

  /**
   *  Refresh token
   */
  public requestAccessToken(): Observable<Token> {
    const refreshToken = this.getToken(AuthenticationService.REFRESH_TOKEN_NAME);
    return this.http.post(
      `${api}/${urls.TOKEN_REFRESH}/`,
      { refresh: refreshToken }
    ).pipe(
      tap((response: RequestAccessTokenResponse) =>
        this.setToken(AuthenticationService.ACCESS_TOKEN_NAME, response.access)
      ),
      catchError(this.unauthorised.bind(this))
    );
  }


  /**
   *  Logout user from crm
   */
  public unauthorised(): Observable<never> {
    // auto logout if 401 response returned from api
    this.logout();
    location.reload();
    const error = { status: errors.UNAUTHORIZED, error: { message: errorMessages.UNAUTHORIZED } };
    return throwError(error);
  }
}
