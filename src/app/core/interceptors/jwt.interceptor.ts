import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../services/auth.service';
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { switchMap, take, filter, catchError } from 'rxjs/operators';
import { Token } from '../models/instances/token.model';

/**
 * This interceptor for inject JWT to every, almost, request and refresh token if its needed
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthenticationService) {}

  /**
   *   Try to inject and execute request, refresh token if unauthorised or throw error if something else
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return next.handle(this.injectToken(request)).pipe(
      catchError(
        // @ts-ignore
        (error) => {
          if (error.status === 401) {
            return this.refreshToken(request, next);
          } else {
            return throwError(error);
          }
        }
      )
    );
  }

  /**
   *   Check if refreshing has not already started
   */
  public refreshToken = (request, next) => {
    if (!this.refreshTokenInProgress) {
      return this.processRefreshingToken(request, next);
    } else {
      return this.processHandlingRequest(request, next);
    }
  };

  /**
   *   set isRefreshing variable to true and populate null
   *   into refreshTokenSubject behavior subject. Later, the actual refreshing request starts.
   *   In case of success, isRefreshing is set to false and received JWT token is placed into the refreshTokenSubject
   */
  private processRefreshingToken(request, next) {
    this.refreshTokenInProgress = true;
    return this.authService.requestAccessToken().pipe(
      switchMap((authResponse: Token) => {
        this.refreshTokenInProgress = false;
        this.refreshTokenSubject.next(authResponse.access);
        return next.handle(this.injectToken(request));
      })
    );
  }

  /**
   *   In case the refreshing is already happening (the else part of the if statement),
   *   we want to wait until refreshTokenSubject contains value other than null.
   */
  private processHandlingRequest(request, next) {
    return this.refreshTokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((res) => {
        return next.handle(this.injectToken(request));
      })
    );
  }

  /**
   *   Some endpoints dont require token
   */
  belongToTokenFreeUrls(url) {
    const tokenFreeUrls = ['login', 'confirm-user', 'token-refresh'];
    return !!tokenFreeUrls.filter((el) => url.indexOf(el) !== -1).length;
  }

  /**
   *   Add token to request
   */
  injectToken(request: HttpRequest<any>) {
    const token = this.authService.getToken(AuthenticationService.ACCESS_TOKEN_NAME);
    const belong = this.belongToTokenFreeUrls(request.url);

    if (token && !belong) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }
}
