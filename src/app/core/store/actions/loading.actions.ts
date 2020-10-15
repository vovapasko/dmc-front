import { Action } from '@ngrx/store';
import { SetLoadingPayload } from '@models/payloads/loading/set';


export enum ELoadingActions {
  StartLoading = '[Loading] Start loading',
  StartLoadingSuccess = '[Loading] Start loading success',
  StopLoading = '[Loading] Stop loading',
  StopLoadingSuccess = '[Loading] Stop loading success',
}

export class StartLoading implements Action {
  public readonly type = ELoadingActions.StartLoading;

  constructor(public payload: SetLoadingPayload) {
  }
}

export class StartLoadingSuccess implements Action {
  public readonly type = ELoadingActions.StartLoadingSuccess;

  constructor(public payload: SetLoadingPayload) {
  }
}

export class StopLoading implements Action {
  public readonly type = ELoadingActions.StopLoading;

  constructor(public payload: SetLoadingPayload) {
  }
}

export class StopLoadingSuccess implements Action {
  public readonly type = ELoadingActions.StopLoadingSuccess;

  constructor(public payload: SetLoadingPayload) {
  }
}


export type LoadingActions =
  | StartLoading
  | StartLoadingSuccess
  | StopLoading
  | StopLoadingSuccess;
