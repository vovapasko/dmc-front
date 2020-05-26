import { Action } from '@ngrx/store';
import { Project } from '../../models/instances/project';
import { Email } from '../../models/instances/email';
import { CreateEmailPayload } from '../../models/payloads/project/email/create';
import { UpdateEmailPayload } from '../../models/payloads/project/email/update';
import { DeleteEmailPayload } from '../../models/payloads/project/email/delete';

export enum EProjectActions {
  GetProjects = '[Project] Get projects',
  GetProjectsSuccess = '[Project] Get projects success',

  GetEmails = '[Project] Get emails',
  GetEmailsSuccess = '[Project] Get emails success',

  CreateEmail = '[Project] Create email',
  CreateEmailSuccess = '[Project] Create email success',

  UpdateEmail = '[Project] Update email',
  UpdateEmailSuccess = '[Project] Update email success',

  DeleteEmail = '[Project] Delete email',
  DeleteEmailSuccess = '[Project] Delete email success',
}

export class GetProjects implements Action {
  public readonly type = EProjectActions.GetProjects;

  constructor() {
  }
}

export class GetProjectsSuccess implements Action {
  public readonly type = EProjectActions.GetProjectsSuccess;

  constructor(public payload: Project[]) {
  }
}

export class GetEmails {
  public readonly type = EProjectActions.GetEmails;

  constructor() {
  }
}

export class GetEmailsSuccess {
  public readonly type = EProjectActions.GetEmailsSuccess;

  constructor(public payload: Email[]) {
  }
}

export class CreateEmail {
  public readonly type = EProjectActions.CreateEmail;

  constructor(public payload: CreateEmailPayload) {
  }
}

export class CreateEmailSuccess {
  public readonly type = EProjectActions.CreateEmailSuccess;

  constructor(public payload: Email) {
  }
}

export class UpdateEmail {
  public readonly type = EProjectActions.UpdateEmail;

  constructor(public payload: UpdateEmailPayload) {
  }
}

export class UpdateEmailSuccess {
  public readonly type = EProjectActions.UpdateEmailSuccess;

  constructor(public payload: Email) {
  }
}

export class DeleteEmail {
  public readonly type = EProjectActions.DeleteEmail;

  constructor(public payload: DeleteEmailPayload) {
  }
}

export class DeleteEmailSuccess {
  public readonly type = EProjectActions.DeleteEmailSuccess;

  constructor(public payload: DeleteEmailPayload) {
  }
}


export type ProjectActions =
  | GetEmails
  | GetEmailsSuccess
  | GetProjects
  | GetProjectsSuccess
  | CreateEmail
  | CreateEmailSuccess
  | UpdateEmail
  | UpdateEmailSuccess
  | DeleteEmail
  | DeleteEmailSuccess
  