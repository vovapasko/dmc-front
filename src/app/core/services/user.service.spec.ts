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
  mockUpdateProfile,
  mockUser,
  mockUsers,
} from '../mocks/user.mock';
import { User } from '../models/instances/user.models';
import { PaginationService } from './pagination.service';
import { CookieService } from '../providers/cookie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestHandler } from '../helpers/request-handler';
import { RouterStub } from '../helpers/router-stub';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
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
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      service.getAll().subscribe((users) => {
        expect(users.length).toBe(mockUsers.length);
      });

      const req = httpMock.expectOne(`${api}/users/?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush({ results: mockUsers });
    });
  });

  describe('#signup', () => {
    it('should return an Observable<User>', () => {
      service.signup(mockSignUp).subscribe((user) => {
        expect(user).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/confirm-user/${mockSignUp.invite}`);
      expect(req.request.method).toBe('POST');
      req.flush({ user: mockUser, token: 'token' });
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
      expect(req.request.method).toBe('DELETE');
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

  describe('#confirmResetPassword', () => {
    it('should return an Observable<User>', () => {
      service.confirmResetPassword(mockConfirmResetPassword).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/change-pass/${mockConfirmResetPassword.confirm}`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true });
    });
  });

  describe('#updateProfile', () => {
    it('should return an Observable<User[]>', () => {
      service.updateProfile(mockUpdateProfile).subscribe((user) => {
        expect(user).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/profile/`);
      expect(req.request.method).toBe('PUT');
      req.flush({ user: mockUser });
    });
  });
});
