import { Action } from '@ngrx/store';
import { Client } from '@models/instances/client';
import { CreateClientPayload } from '@models/payloads/client/create';
import { UpdateClientPayload } from '@models/payloads/client/update';
import { DeleteClientPayload } from '@models/payloads/client/delete';


export enum EClientActions {
  GetClients = '[Client] Get clients',
  GetClientsSuccess = '[Client] Get clients success',
  CreateClient = '[Client] Create client',
  CreateClientSuccess = '[Client] Create client success',
  UpdateClient = '[Client] Update client',
  UpdateClientSuccess = '[Client] Update client success',
  DeleteClient = '[Client] Delete client',
  DeleteClientSuccess = '[Client] Delete client success',
  SelectClient = '[Client] Select client',
  SelectClientSuccess = '[Client] Select client success',
}

export class GetClients implements Action {
  public readonly type = EClientActions.GetClients;

  constructor() {
  }
}

export class GetClientsSuccess implements Action {
  public readonly type = EClientActions.GetClientsSuccess;

  constructor(public payload: Array<Client>) {
  }
}


export class CreateClient implements Action {
  public readonly type = EClientActions.CreateClient;

  constructor(public payload: CreateClientPayload) {
  }
}

export class CreateClientSuccess implements Action {
  public readonly type = EClientActions.CreateClientSuccess;

  constructor(public payload: Client) {
  }
}

export class UpdateClient implements Action {
  public readonly type = EClientActions.UpdateClient;

  constructor(public payload: UpdateClientPayload) {
  }
}

export class UpdateClientSuccess implements Action {
  public readonly type = EClientActions.UpdateClientSuccess;

  constructor(public payload: Client) {
  }
}

export class DeleteClient implements Action {
  public readonly type = EClientActions.DeleteClient;

  constructor(public payload: DeleteClientPayload) {
  }
}

export class DeleteClientSuccess implements Action {
  public readonly type = EClientActions.DeleteClientSuccess;

  constructor(public payload: DeleteClientPayload) {
  }
}

export class SelectClient implements Action {
  public readonly type = EClientActions.SelectClient;

  constructor(public payload: Client) {
  }
}

export class SelectClientSuccess implements Action {
  public readonly type = EClientActions.SelectClientSuccess;

  constructor(public payload: Client) {
  }
}

export type ClientActions =
  | GetClients
  | GetClientsSuccess
  | CreateClient
  | CreateClientSuccess
  | UpdateClient
  | UpdateClientSuccess
  | DeleteClient
  | DeleteClientSuccess
  | SelectClient
  | SelectClientSuccess;
