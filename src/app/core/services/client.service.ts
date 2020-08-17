import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients$: BehaviorSubject<Array<Client>> = new BehaviorSubject([]);
  selectedClient$: BehaviorSubject<Client> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder
  ) {
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

  public selectClient(client: Client): Observable<Client> {
    this.selectedClient = client;
    return of(client);
  }

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
  public getAll(): Observable<Client[]> {
    return this.requestHandler.request(`${api}/${endpoints.CLIENT}/`,
      methods.GET,
      null,
      (response: { results: Array<Client> }) => {
        const clients = response.results;
        this.clients = clients;
        return clients;
      }
    );
  }

  /**
   *  Create clients
   */
  public create(payload: CreateClientPayload): Observable<Client> {
    return this.requestHandler.request(`${api}/${endpoints.CLIENT}/`,
      methods.POST,
      payload,
      (response: Client) => {
        this.clients = [...this.clients, response];
        return response;
      }
    );
  }

  /**
   *  Update clients
   */
  public update(payload: UpdateClientPayload): Observable<Client> {
    return this.requestHandler.request(`${api}/${endpoints.CLIENT}/${payload.id}`,
      methods.PUT,
      payload,
      (response: Client) => {
        this.clients = this.clients.map(el => el.id === response.id ? response : el);
        return response;
      }
    );
  }

  /**
   *  Delete clients
   */
  public delete(payload: DeleteClientPayload): Observable<null> {
    return this.requestHandler.request(`${api}/${endpoints.CLIENT}/${payload.id}`,
      methods.DELETE,
      null,
      (response: null) => {
        this.clients = this.clients.filter(el => el.id !== payload.id);
        return payload;
      }
    );
  }

}
