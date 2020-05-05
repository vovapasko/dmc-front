import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../../../environments/environment';

import { PaginationService } from './pagination.service';
import { ContractorService } from './contractor.service';
import { RequestHandler } from '../helpers/request-handler';
import { mockContractor, mockContractors, mockCreate, mockDelete, mockUpdate } from '../mocks/contractor.mock';
import { Contractor } from '../models/instances/contractor';
import { NewsService } from './news.service';
import { NotificationService } from './notification.service';
import { Hashtag } from '../models/instances/hashtag';
import { Format } from '../models/instances/format';
import { Character } from '../models/instances/character';
import { Method } from '../models/instances/method';
import { mockPayload, mockProject } from '../mocks/project.mock';

describe('NewsService', () => {
  let injector: TestBed;
  let service: NewsService;
  let httpMock: HttpTestingController;
  const api = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [FormBuilder, RequestHandler, PaginationService, NotificationService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    injector = getTestBed();
    service = injector.get(NewsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#createProject', () => {
    it('should return an Observable<Contractor>', () => {
      // @ts-ignore
      service.createProject({ data: mockProject }).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/manage-news-projects/`);
      expect(req.request.method).toBe('POST');
      req.flush({
        project: mockProject,
      });
    });
  });

  describe('#getProject', () => {
    it('should return an Observable<Contractor>', () => {
      // @ts-ignore
      service.getProject(mockPayload).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/manage-news-projects/${mockPayload.id}`);
      expect(req.request.method).toBe('GET');
      req.flush({
        project: mockProject,
      });
    });
  });

  describe('#getConfiguration', () => {
    it('should return an Observable<Contractor>', () => {
      service.getProjectConfiguration().subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/burst-news/`);
      expect(req.request.method).toBe('GET');
      req.flush({
        contractors: [],
        hashtags: [],
        formats: [],
        characters: [],
        burstMethods: [],
      });
    });
  });
});
