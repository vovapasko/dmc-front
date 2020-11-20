import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { RequestHandler } from '@helpers/request-handler';
import { AuthenticationService } from './auth.service';
import { UserService } from './user.service';
import { PaginationService } from './pagination.service';
import { CookieService } from '../providers/cookie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mockUser } from '../mocks/user.mock';
import { mockLogin } from '../mocks/auth.mock';
import { RouterStub } from '@helpers/router-stub';

describe('AuthenticationService', () => {
  let injector: TestBed;
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  const api = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        UserService,
        FormBuilder,
        PaginationService,
        CookieService,
        RequestHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                returnUrl: {
                  get(): string {
                    return '';
                  },
                },
              },
            },
          },
        },
        { provide: Router, useClass: RouterStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    injector = getTestBed();
    service = injector.get(AuthenticationService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#login', () => {
    it('should return an Observable', () => {
      service.login(mockLogin).subscribe((user) => {
        expect(user).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/login/`);
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
    });
  });

  describe('#logout', () => {
    it('should return an Observable', () => {
      service.logout();
      expect(service.user).toBeFalsy();
    });
  });
});
