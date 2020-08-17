import { getTestBed, TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationService } from '@services/pagination.service';
import { CookieService } from '../providers/cookie.service';
import { RequestHandler } from '@helpers/request-handler';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterStub } from '@helpers/router-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { endpoints } from '@constants/endpoints';
import { MockClient, MockClients } from '../mocks/client.mock';
import { CreateClientPayload } from '@models/payloads/client/create';
import { UpdateClientPayload } from '@models/payloads/client/update';
import { DeleteClientPayload } from '@models/payloads/client/delete';

describe('ClientService', () => {

  let injector: TestBed;
  let service: ClientService;
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
    service = injector.get(ClientService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    service = TestBed.get(ClientService);
    expect(service).toBeTruthy();
  });

  describe('should get proxies', () => {
    it('should return an Observable<Client[]>', () => {
      service.getAll().subscribe((proxies) => {
        expect(MockClients.length).toBe(MockClients.length);
      });

      const req = httpMock.expectOne(`${api}/${endpoints.CLIENT}/`);
      expect(req.request.method).toBe('GET');
      req.flush({ results: MockClients });
    });
  });

  describe('should create clients', () => {
    it('should return an Observable<Client>', () => {
      const payload = {data: MockClient} as unknown as CreateClientPayload;
      service.create(payload).subscribe((proxy) => {
        expect(proxy).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/${endpoints.CLIENT}/`);
      expect(req.request.method).toBe('POST');
      req.flush(MockClient);
    });
  });

  describe('should update clients', () => {
    it('should return an Observable<Client>', () => {
      const payload = {id: MockClient.id, data: MockClient} as unknown as UpdateClientPayload;
      service.update(payload).subscribe((group) => {
        expect(group).toBeTruthy();
      });

      const req = httpMock.expectOne(`${api}/${endpoints.CLIENT}/${MockClient.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(MockClient);
    });
  });

  describe('should delete clients', () => {
    it('should return an Observable<Client>', () => {
      const payload = [MockClient] as unknown as DeleteClientPayload;
      service.delete(payload).subscribe((response) => {
        expect(response).toBe(payload);
      });

      const req = httpMock.expectOne(`${api}/${endpoints.CLIENT}/${payload.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
