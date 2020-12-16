import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import {
  mockConfirmResetPassword,
  mockDelete,
  mockRegister,
  mockSignUp,
  mockUpdate,
  mockUser,
  mockUsers,
} from '../mocks/user.mock';
import { PaginationService } from './pagination.service';
import { CookieService } from '../providers/cookie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestHandler } from '@helpers/request-handler';
import { RouterStub } from '@helpers/router-stub';
import { KeepaliveSvc, NgIdleModule } from 'ng2-idle-core';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;
  const api = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule, NgIdleModule.forRoot()],
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
        { provide: KeepaliveSvc, useValue: undefined }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const payload = {page: 1};
      service.getAll(payload).subscribe((users) => {
        expect(users.length).toBe(mockUsers.length);
      });

      const req = httpMock.expectOne(`${api}/users/?page=1&`);
      expect(req.request.method).toBe('GET');
      req.flush({ results: mockUsers });
    });
  });

  describe('#register', () => {
    it('should return an Observable<User>', () => {
      service.register(mockRegister).subscribe((user) => {
        expect(user).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/invite-new-user/`);
      expect(req.request.method).toBe('POST');
      req.flush({ user: mockUser });
    });
  });

  describe('#delete', () => {
    it('should return an Observable<User>', () => {
      service.delete(mockDelete).subscribe((payload) => {
        expect(payload).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/users/${mockDelete.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockDelete);
    });
  });

  describe('#update', () => {
    it('should return an Observable<User>', () => {
      service.update(mockUpdate).subscribe((user) => {
        expect(user).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/change-group/${mockUpdate.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush({ message: { user: mockUser } });
    });
  });

  describe('#resetPassword', () => {
    it('should return an Observable<User>', () => {
      service.resetPassword().subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/change-password-confirm/`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true });
    });
  });
});
