import { Action } from '@ngrx/store';

import { Contractor } from '../../models/instances/contractor';

export enum EContractorActions {
  GetContractors = '[Contractor] Get contractors',
  GetContractorsSuccess = '[Contractor] Get contractors success',
  CreateContractors = '[Contractor] Create contractors',
  CreateContractorsSuccess = '[Contractor] Create contractors success',
  UpdateContractors = '[Contractor] Update contractors',
  UpdateContractorsSuccess = '[Contractor] Update contractors success',
  DeleteContractors = '[Contractor] Delete contractors',
  DeleteContractorsSuccess = '[Contractor] Delete contractors success',
  SelectContractor = '[Contractor] Select contractor',
  SelectContractorSuccess = '[Contractor] Select contractor success',
}

export class SelectContractor implements Action {
  public readonly type = EContractorActions.SelectContractor;

  constructor(public payload: Contractor) {}
}

export class SelectContractorSuccess implements Action {
  public readonly type = EContractorActions.SelectContractorSuccess;

  constructor(public payload: Contractor) {}
}

export class GetContractors implements Action {
  public readonly type = EContractorActions.GetContractors;
}

export class GetContractorsSuccess implements Action {
  public readonly type = EContractorActions.GetContractorsSuccess;

  constructor(public payload: Contractor[]) {}
}

export class CreateContractors implements Action {
  public readonly type = EContractorActions.CreateContractors;

  constructor(public payload) {}
}

export class CreateContractorsSuccess implements Action {
  public readonly type = EContractorActions.CreateContractorsSuccess;

  constructor(public payload: Contractor) {}
}

export class UpdateContractors implements Action {
  public readonly type = EContractorActions.UpdateContractors;

  constructor(public payload) {}
}

export class UpdateContractorsSuccess implements Action {
  public readonly type = EContractorActions.UpdateContractorsSuccess;

  constructor(public payload: Contractor) {}
}

export class DeleteContractors implements Action {
  public readonly type = EContractorActions.DeleteContractors;

  constructor(public payload) {}
}

export class DeleteContractorsSuccess implements Action {
  public readonly type = EContractorActions.DeleteContractorsSuccess;

  constructor(public payload) {}
}

export type ContractorActions =
  | GetContractors
  | GetContractorsSuccess
  | CreateContractors
  | CreateContractorsSuccess
  | UpdateContractors
  | UpdateContractorsSuccess
  | DeleteContractors
  | DeleteContractorsSuccess
  | SelectContractor
  | SelectContractorSuccess;
