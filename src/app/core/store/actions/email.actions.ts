import { Action } from '@ngrx/store';
import { GmailAuthResponse } from '@models/instances/gmail-auth-response';
import { AuthPayload } from '@models/payloads/email/auth';
import { Email, EmailEntity } from '@models/instances/email';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { GetEmailsPayload } from '@models/payloads/email/get-emails';
import { GetEmailsResponse } from '@models/responses/email/get-emails';
import { TrashPayload } from '@models/payloads/email/trash';
import { GetEmailPayload } from '@models/payloads/email/get-email';
import { ComposeEmailPayload } from '@models/payloads/email/compose-email';

export enum EEmailActions {
  GetEmails = '[Email] Get emails',
  GetEmailsSuccess = '[Email] Get emails success',
  ComposeEmail = '[Email] Compose emails',
  ComposeEmailSuccess = '[Email] Compose emails success',
  GetEmail = '[Email] Get email',
  GetEmailSuccess = '[Email] Get email success',
  TrashEmail = '[Email] Trash email',
  TrashEmailSuccess = '[Email] Trash email success',
  UntrashEmail = '[Email] Untrash email',
  UntrashEmailSuccess = '[Email] Untrash email success',
  RemoveEmail = '[Email] Remove email',
  RemoveEmailSuccess = '[Email] Remove email success',
  GetTrash = '[Email] Get trash',
  GetTrashSuccess = '[Email] Get trash success',
  GetSent = '[Email] Get sent',
  GetSentSuccess = '[Email] Get sent success',
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
  SelectNewsEmail = '[Email] Select news email',
  SelectNewsEmailSuccess = '[Email] Select news email success',
  SelectEmail = '[Email] Select email',
  SelectEmailSuccess = '[Email] Select email success',
}

export class SelectNewsEmail implements Action {
  public readonly type = EEmailActions.SelectNewsEmail;

  constructor(public payload: Email) {
  }
}

export class SelectNewsEmailSuccess implements Action {
  public readonly type = EEmailActions.SelectNewsEmailSuccess;

  constructor(public payload: Email) {
  }
}

export class ComposeEmail implements Action {
  public readonly type = EEmailActions.ComposeEmail;

  constructor(public payload: ComposeEmailPayload) {
  }
}

export class ComposeEmailSuccess implements Action {
  public readonly type = EEmailActions.ComposeEmailSuccess;

  constructor(public payload: EmailEntity) {
  }
}

export class SelectEmail implements Action {
  public readonly type = EEmailActions.SelectEmail;

  constructor(public payload: GetEmailPayload) {
  }
}

export class SelectEmailSuccess implements Action {
  public readonly type = EEmailActions.SelectEmailSuccess;

  constructor(public payload: EmailEntity) {
  }
}

export class GetEmails implements Action {
  public readonly type = EEmailActions.GetEmails;

  constructor(public payload: GetEmailsPayload) {
  }
}

export class GetEmailsSuccess implements Action {
  public readonly type = EEmailActions.GetEmailsSuccess;

  constructor(public payload: GetEmailsResponse) {
  }
}


export class GetEmail implements Action {
  public readonly type = EEmailActions.GetEmail;

  constructor(public payload: GetEmailPayload) {
  }
}

export class GetEmailSuccess implements Action {
  public readonly type = EEmailActions.GetEmailSuccess;

  constructor(public payload: EmailEntity) {
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


export class GetTrash implements Action {
  public readonly type = EEmailActions.GetTrash;

  constructor(public payload: GetEmailsPayload) {
  }
}

export class GetTrashSuccess implements Action {
  public readonly type = EEmailActions.GetTrashSuccess;

  constructor(public payload: GetEmailsResponse) {
  }
}


export class GetSent implements Action {
  public readonly type = EEmailActions.GetSent;

  constructor(public payload: GetEmailsPayload) {
  }
}

export class GetSentSuccess implements Action {
  public readonly type = EEmailActions.GetSentSuccess;

  constructor(public payload: GetEmailsResponse) {
  }
}

export class TrashEmail implements Action {
  public readonly type = EEmailActions.TrashEmail;

  constructor(public payload: TrashPayload) {
  }
}

export class TrashEmailSuccess implements Action {
  public readonly type = EEmailActions.TrashEmailSuccess;

  constructor(public payload: TrashPayload) {
  }
}


export class UntrashEmail implements Action {
  public readonly type = EEmailActions.UntrashEmail;

  constructor(public payload: TrashPayload) {
  }
}

export class UntrashEmailSuccess implements Action {
  public readonly type = EEmailActions.UntrashEmailSuccess;

  constructor(public payload: TrashPayload) {
  }
}

export class RemoveEmail implements Action {
  public readonly type = EEmailActions.RemoveEmail;

  constructor(public payload: TrashPayload) {
  }
}

export class RemoveEmailSuccess implements Action {
  public readonly type = EEmailActions.RemoveEmailSuccess;

  constructor(public payload: TrashPayload) {
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
  | GetEmailsSuccess
  | SelectEmail
  | SelectEmailSuccess
  | SelectNewsEmail
  | SelectNewsEmailSuccess
  | GetTrash
  | GetTrashSuccess
  | GetSent
  | GetSentSuccess
  | TrashEmail
  | TrashEmailSuccess
  | UntrashEmail
  | UntrashEmailSuccess
  | RemoveEmail
  | RemoveEmailSuccess
  | GetEmail
  | GetEmailSuccess
  | ComposeEmail
  | ComposeEmailSuccess;
