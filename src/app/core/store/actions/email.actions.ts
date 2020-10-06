import { Action } from '@ngrx/store';
import { GmailAuthResponse } from '@models/instances/gmail-auth-response';
import { AuthPayload } from '@models/payloads/email/auth';
import { Email, EmailEntity } from '@models/instances/email';
import { CreateEmailPayload } from '@models/payloads/project/email/create';

export enum EEmailActions {
  GetEmails = '[Email] Get emails',
  GetEmailsSuccess = '[Email] Get emails success',
  GetNewsEmails = '[Email] Get news emails',
  GetNewsEmailsSuccess = '[Email] Get news emails success',
  CreateNewsEmail = '[Email] Create news email',
  CreateNewsEmailSuccess = '[Email] Create news email success',
  GmailAuth = '[Email] Gmail auth',
  GmailAuthSuccess = '[Email] Gmail auth success',
  GmailCredsClear = '[Email] Gmail credentials clear',
  GmailCredsClearSuccess = '[Email] Gmail credentials clear success',
  GmailTokenRevoke = '[Email] Gmail token revoke',
  GmailTokenRevokeSuccess = '[Email] Gmail token revoke success',
}

export class GetEmails implements Action {
  public readonly type = EEmailActions.GetEmails;

  constructor() {
  }
}

export class GetEmailsSuccess implements Action {
  public readonly type = EEmailActions.GetEmailsSuccess;

  constructor(public payload: Array<EmailEntity>) {
  }
}


export class GetNewsEmails implements Action {
  public readonly type = EEmailActions.GetNewsEmails;

  constructor() {
  }
}

export class GetNewsEmailsSuccess implements Action {
  public readonly type = EEmailActions.GetNewsEmailsSuccess;

  constructor(public payload: Array<Email>) {
  }
}

export class GmailAuth implements Action {
  public readonly type = EEmailActions.GmailAuth;

  constructor(public payload: AuthPayload) {
  }
}

export class GmailAuthSuccess implements Action {
  public readonly type = EEmailActions.GmailAuthSuccess;

  constructor(public payload: GmailAuthResponse) {
  }
}

export class GmailCredsClear implements Action {
  public readonly type = EEmailActions.GmailCredsClear;

  constructor(public payload: AuthPayload) {
  }
}

export class GmailCredsClearSuccess implements Action {
  public readonly type = EEmailActions.GmailCredsClearSuccess;

  constructor() {
  }
}

export class GmailTokenRevoke implements Action {
  public readonly type = EEmailActions.GmailTokenRevoke;

  constructor(public payload: AuthPayload) {
  }
}

export class GmailTokenRevokeSuccess implements Action {
  public readonly type = EEmailActions.GmailTokenRevokeSuccess;

  constructor(public payload: AuthPayload) {
  }
}


export class CreateNewsEmail {
  public readonly type = EEmailActions.CreateNewsEmail;

  constructor(public payload: CreateEmailPayload) {
  }
}

export class CreateNewsEmailSuccess {
  public readonly type = EEmailActions.CreateNewsEmailSuccess;

  constructor(public payload: Email) {
  }
}


export type EmailActions =
  | GmailAuth
  | GmailAuthSuccess
  | GmailCredsClear
  | GmailCredsClearSuccess
  | GmailTokenRevoke
  | GmailTokenRevokeSuccess
  | GetNewsEmails
  | GetNewsEmailsSuccess
  | CreateNewsEmail
  | CreateNewsEmailSuccess
  | GetEmails
  | GetEmailsSuccess;
