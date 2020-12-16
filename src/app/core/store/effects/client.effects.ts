import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '@services/auth.service';
import { ClientService } from '@services/client.service';
import {
  CreateClient,
  CreateClientSuccess, DeleteClient, DeleteClientSuccess,
  EClientActions,
  GetClients,
  GetClientsSuccess, SelectClient, SelectClientSuccess, UpdateClient,
  UpdateClientSuccess
} from '@store/actions/client.actions';
import { Client } from '@models/instances/client';
import { CreateClientPayload } from '@models/payloads/client/create';
import { UpdateClientPayload } from '@models/payloads/client/update';
import { DeleteClientPayload } from '@models/payloads/client/delete';
import { GetClientsPayload } from '@models/payloads/client/get';

@Injectable({
  providedIn: 'root',
})
export class ClientEffects {
  @Effect()
  getClients$ = this.actions$.pipe(
    ofType<GetClients>(EClientActions.GetClients),
    switchMap((action: {payload: GetClientsPayload}) => this.clientService.getAll(action.payload)),
    switchMap((proxies: Client[]) => of(new GetClientsSuccess(proxies)))
  );

  @Effect()
  createClient$ = this.actions$.pipe(
    ofType<CreateClient>(EClientActions.CreateClient),
    switchMap((action: { payload: CreateClientPayload }) => this.clientService.create(action.payload)),
    switchMap((proxy: Client) => of(new CreateClientSuccess(proxy)))
  );

  @Effect()
  updateClient$ = this.actions$.pipe(
    ofType<UpdateClient>(EClientActions.UpdateClient),
    switchMap((action: { payload: UpdateClientPayload }) => this.clientService.update(action.payload)),
    switchMap((proxy: Client) => of(new UpdateClientSuccess(proxy)))
  );

  @Effect()
  deleteClient$ = this.actions$.pipe(
    ofType<DeleteClient>(EClientActions.DeleteClient),
    switchMap((action: { payload: DeleteClientPayload }) => this.clientService.delete(action.payload)),
    switchMap((payload: DeleteClientPayload) => of(new DeleteClientSuccess(payload)))
  );

  @Effect()
  selectClient$ = this.actions$.pipe(
    ofType<SelectClient>(EClientActions.SelectClient),
    switchMap((action: { payload: Client }) => this.clientService.selectClient(action.payload)),
    switchMap((payload: Client) => of(new SelectClientSuccess(payload)))
  );

  constructor(
    private clientService: ClientService,
    private authService: AuthenticationService,
    private actions$: Actions
  ) {}
}
