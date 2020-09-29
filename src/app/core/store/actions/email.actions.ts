import { Action } from '@ngrx/store';
import { GmailAuthResponse } from '@models/instances/gmail-auth-response';
import { AuthPayload } from '@models/payloads/email/auth';

export enum EEmailActions {
  GmailAuth = '[Email] Gmail auth',
  GmailAuthSuccess = '[Email] Gmail auth success',
  GmailCredsClear = '[Email] Gmail credentials clear',
  GmailCredsClearSuccess = '[Email] Gmail credentials clear success',
  GmailTokenRevoke = '[Email] Gmail token revoke',
  GmailTokenRevokeSuccess = '[Email] Gmail token revoke success',
}

export class GmailAuth implements Action {
  public readonly type = EEmailActions.GmailAuth;

  constructor() {
  }
}

export class GmailAuthSuccess implements Action {
  public readonly type = EEmailActions.GmailAuthSuccess;

  constructor(public payload: GmailAuthResponse) {
  }
}

export class GmailCredsClear implements Action {
  public readonly type = EEmailActions.GmailCredsClear;

  constructor(payload: AuthPayload) {
  }
}

export class GmailCredsClearSuccess implements Action {
  public readonly type = EEmailActions.GmailCredsClearSuccess;

  constructor() {
  }
}

export class GmailTokenRevoke implements Action {
  public readonly type = EEmailActions.GmailTokenRevoke;

  constructor(payload: AuthPayload) {
  }
}

export class GmailTokenRevokeSuccess implements Action {
  public readonly type = EEmailActions.GmailTokenRevokeSuccess;

  constructor() {
  }
}


export type EmailActions =
  | GmailAuth
  | GmailAuthSuccess
  | GmailCredsClear
  | GmailCredsClearSuccess
  | GmailTokenRevoke
  | GmailTokenRevokeSuccess;
