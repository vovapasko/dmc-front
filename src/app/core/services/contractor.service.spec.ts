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

describe('ContractorService', () => {
  let injector: TestBed;
  let service: ContractorService;
  let httpMock: HttpTestingController;
  const api = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [ContractorService, FormBuilder, RequestHandler, PaginationService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    injector = getTestBed();
    service = injector.get(ContractorService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getContractors', () => {
    it('should return an Observable<Contractor[]>', () => {
      const payload = {page: 1};
      service.getAll(payload).subscribe((contractors) => {
        expect(contractors.length).toBe(mockContractors.length);
      });

      const req = httpMock.expectOne(`${api}/contractors/?page=1&`);
      expect(req.request.method).toBe('GET');
      req.flush({ results: mockContractors });
    });
  });

  describe('#createContractor', () => {
    it('should return an Observable<Contractor>', () => {
      service.create(mockCreate).subscribe((contractor) => {
        expect(contractor).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/contractors/`);
      expect(req.request.method).toBe('POST');
      req.flush({ contractor: mockContractor });
    });
  });

  describe('#updateContractor', () => {
    it('should return an Observable<Contractor>', () => {
      service.update(mockUpdate).subscribe((contractor) => {
        expect(contractor).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/contractors/${mockUpdate.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush({ contractor: mockContractor });
    });
  });

  describe('#deleteContractor', () => {
    it('should return an Observable<Contractor>', () => {
      service.delete(mockDelete).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/contractors/${mockDelete.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true });
    });
  });
});
