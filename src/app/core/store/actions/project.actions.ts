import { Action } from '@ngrx/store';
import { Email } from '@models/instances/email';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { UpdateEmailPayload } from '@models/payloads/project/email/update';
import { DeleteEmailPayload } from '@models/payloads/project/email/delete';
import { CreateNewsProjectPayload } from '@models/payloads/project/news-project/create';
import { NewsProject } from '@models/instances/news-project';
import { UpdateNewsProjectPayload } from '@models/payloads/project/news-project/update';
import { GetNewsProjectPayload } from '@models/payloads/project/news-project/get';
import { DeleteNewsProjectPayload } from '@models/payloads/project/news-project/delete';

export enum EProjectActions {
  GetProjects = '[Project] Get projects',
  GetProjectsSuccess = '[Project] Get projects success',

  GetNewsProjects = '[Project] Get news projects',
  GetNewsProjectsSuccess = '[Project] Get news projects success',

  CreateNewsProject = '[Project] Create news project',
  CreateNewsProjectSuccess = '[Project] Create news project success',

  UpdateNewsProject = '[Project] Update news project',
  UpdateNewsProjectSuccess = '[Project] Update news project success',

  DeleteNewsProject = '[Project] Delete news project',
  DeleteNewsProjectSuccess = '[Project] Delete news project success',

  GetNewsProject = '[Project] Get news project',
  GetNewsProjectSuccess = '[Project] Get news project success',

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

  constructor(public payload: NewsProject[]) {
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


export class CreateNewsProject {
  public readonly type = EProjectActions.CreateNewsProject;

  constructor(public payload: CreateNewsProjectPayload) {
  }
}

export class CreateNewsProjectSuccess {
  public readonly type = EProjectActions.CreateNewsProjectSuccess;

  constructor(public payload: NewsProject) {
  }
}

export class UpdateNewsProject {
  public readonly type = EProjectActions.UpdateNewsProject;

  constructor(public payload: UpdateNewsProjectPayload) {
  }
}

export class UpdateNewsProjectSuccess {
  public readonly type = EProjectActions.UpdateNewsProjectSuccess;

  constructor(public payload: NewsProject) {
  }
}

export class GetNewsProject {
  public readonly type = EProjectActions.GetNewsProject;

  constructor(public payload: GetNewsProjectPayload) {
  }
}

export class GetNewsProjectSuccess {
  public readonly type = EProjectActions.GetNewsProjectSuccess;

  constructor(public payload: NewsProject) {
  }
}

export class DeleteNewsProject {
  public readonly type = EProjectActions.DeleteNewsProject;

  constructor(public payload: DeleteNewsProjectPayload) {
  }
}

export class DeleteNewsProjectSuccess {
  public readonly type = EProjectActions.DeleteNewsProjectSuccess;

  constructor(public payload: DeleteNewsProjectPayload) {
  }
}

export class GetNewsProjects {
  public readonly type = EProjectActions.GetNewsProjects;

  constructor() {
  }
}

export class GetNewsProjectsSuccess {
  public readonly type = EProjectActions.GetNewsProjectsSuccess;

  constructor(public payload: NewsProject[]) {
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
  | CreateNewsProject
  | CreateNewsProjectSuccess
  | UpdateNewsProject
  | UpdateNewsProjectSuccess
  | DeleteNewsProject
  | DeleteNewsProjectSuccess
  | GetNewsProject
  | GetNewsProjectSuccess
  | GetNewsProjects
  | GetNewsProjectsSuccess
