import { Action } from '@ngrx/store';
import { SetLoadingPayload } from '@models/payloads/loading/set';


export enum ELoadingActions {
  SetLoading = '[Loading] Set loading',
  SetLoadingSuccess = '[Loading] Set loading success',
}

export class SetLoading implements Action {
  public readonly type = ELoadingActions.SetLoading;

  constructor(public payload: SetLoadingPayload) {
  }
}

export class SetLoadingSuccess implements Action {
  public readonly type = ELoadingActions.SetLoadingSuccess;

  constructor(public payload: SetLoadingPayload) {
  }
}


export type LoadingActions =
  | SetLoading
  | SetLoadingSuccess;
