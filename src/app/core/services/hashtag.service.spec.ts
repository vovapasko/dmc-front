import { getTestBed, TestBed } from '@angular/core/testing';

import { HashtagService } from './hashtag.service';
import { ClientService } from '@services/client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationService } from '@services/pagination.service';
import { CookieService } from '../providers/cookie.service';
import { RequestHandler } from '@helpers/request-handler';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterStub } from '@helpers/router-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HashtagService', () => {
  let injector: TestBed;
  let service: HashtagService;
  let httpMock: HttpTestingController;
  const api = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        ClientService,
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
                  }
                }
              }
            }
          }
        },
        { provide: Router, useClass: RouterStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    injector = getTestBed();
    service = injector.get(HashtagService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    service = TestBed.inject(HashtagService);
    expect(service).toBeTruthy();
  });
});
