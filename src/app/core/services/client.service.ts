import { Injectable } from '@angular/core';
import { RequestHandler } from '@helpers/request-handler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { Client } from '@models/instances/client';
import { environment } from '../../../environments/environment';
import { CreateClientPayload } from '@models/payloads/client/create';
import { UpdateClientPayload } from '@models/payloads/client/update';
import { DeleteClientPayload } from '@models/payloads/client/delete';
import { BaseService } from '@services/base.service';
import { GetClientsPayload } from '@models/payloads/client/get';
import numbers from '@constants/numbers';
import { TicketService } from '@services/ticket.service';
import { PaginationService } from '@services/pagination.service';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  clients$: BehaviorSubject<Array<Client>> = new BehaviorSubject([]);
  selectedClient$: BehaviorSubject<Client> = new BehaviorSubject(null);

  constructor(
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder,
    private ticketService: TicketService,
    private paginationService: PaginationService
  ) {
    super();
  }

  get clients() {
    return this.clients$.getValue();
  }

  set clients(value: Array<Client>) {
    this.clients$.next(value);
  }

  get selectedClient() {
    return this.selectedClient$.getValue();
  }

  set selectedClient(value: Client) {
    this.selectedClient$.next(value);
  }

  /**
   *  Select client for update, editing etc
   *  returns observable
   */
  public selectClient(client: Client): Observable<Client> {
    this.selectedClient = client;
    return of(client);
  }

  /**
   *  Returns form group for client form
   */
  public initializeCreateClientForm(): FormGroup {
    return this.formBuilder.group({
      price: [null, [Validators.required]],
      amountPublications: [null, [Validators.required]],
      emails: [null, [Validators.required]],
      numbers: [null, [Validators.required]],
      name: [null, [Validators.required]],
      hashtags: [null, [Validators.required]]
    });
  }

  /**
   *  Returns form group for update client form
   */
  public initializeUpdateClientForm(): FormGroup {
    return this.formBuilder.group({
      price: [null, [Validators.required]],
      amountPublications: [null, [Validators.required]],
      emails: [null, [Validators.required]],
      numbers: [null, [Validators.required]],
      name: [null, [Validators.required]],
      hashtags: [null, [Validators.required]]
    });
  }

  /**
   *  Get all clients, api returns array of clients
   */
  public getAll(payload: GetClientsPayload): Observable<Client[]> {
    return this.requestHandler.request(
      this.url(api, endpoints.CLIENT, null, { page: payload.page }),
      methods.GET,
      null,
      (response: { results: Array<Client>, count: number }) => {
        const clients = response.results;
        this.clients = clients;
        this.paginationService.totalSize = response.count;
        this.paginationService.page = payload.page;
        this.ticketService.endIndex = payload.page * numbers.pageSize;
        this.ticketService.endIndex = payload.page * numbers.pageSize;
        return clients;
      }
    );
  }

  /**
   *  Create clients
   */
  public create(payload: CreateClientPayload): Observable<Client> {
    return this.requestHandler.request(
      this.url(api, endpoints.CLIENT),
      methods.POST,
      payload,
      (response: Client) => {
        this.clients = [...this.clients, response];
        this.ticketService.searchTerm = '';
        return response;
      }
    );
  }

  /**
   *  Update clients
   */
  public update(payload: UpdateClientPayload): Observable<Client> {
    return this.requestHandler.request(
      this.url(api, endpoints.CLIENT, payload.id),
      methods.PUT,
      payload,
      (response: Client) => {
        this.clients = this.clients.map(el => el.id === response.id ? response : el);
        this.ticketService.searchTerm = '';
        return response;
      }
    );
  }

  /**
   *  Delete clients
   */
  public delete(payload: DeleteClientPayload): Observable<null> {
    return this.requestHandler.request(
      this.url(api, endpoints.CLIENT, payload.id),
      methods.PUT,
      payload,
      (response: null) => {
        this.clients = this.clients.filter(el => el.id !== payload.id);
        this.ticketService.searchTerm = '';
        return payload;
      }
    );
  }

}
