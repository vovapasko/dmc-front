import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { Hashtag } from '../../models/instances/hashtag';
import { CreateHashtagPayload } from '../../models/payloads/news/hashtag/create';
import { ProjectService } from '../../services/project.service';
import {
  CreateEmail, CreateEmailSuccess, DeleteEmail, DeleteEmailSuccess,
  EProjectActions,
  GetEmails,
  GetEmailsSuccess,
  GetProjects,
  GetProjectsSuccess, UpdateEmail, UpdateEmailSuccess
} from '../actions/project.actions';
import { Project } from '../../models/instances/project';
import { GetProject } from '../actions/news.actions';
import { Email } from '../../models/instances/email';
import { CreateEmailPayload } from '../../models/payloads/project/email/create';
import { UpdateEmailPayload } from '../../models/payloads/project/email/update';
import { DeleteEmailPayload } from '../../models/payloads/project/email/delete';

@Injectable({
  providedIn: 'root',
})
export class ProjectEffects {

  @Effect()
  getProjects$ = this.actions$.pipe(
    ofType<GetProjects>(EProjectActions.GetProjects),
    switchMap((action) => this.projectService.getProjects()),
    switchMap((projects: Project[]) => of(new GetProjectsSuccess(projects)))
  );

  @Effect()
  getEmails$ = this.actions$.pipe(
    ofType<GetEmails>(EProjectActions.GetEmails),
    switchMap((action) => this.projectService.getEmails()),
    switchMap((emails: Email[]) => of(new GetEmailsSuccess(emails)))
  );

  @Effect()
  createEmail$ = this.actions$.pipe(
    ofType<CreateEmail>(EProjectActions.CreateEmail),
    switchMap((action: {payload: CreateEmailPayload}) => this.projectService.createEmail(action.payload)),
    switchMap((email: Email) => of(new CreateEmailSuccess(email)))
  );

  @Effect()
  updateEmail$ = this.actions$.pipe(
    ofType<UpdateEmail>(EProjectActions.UpdateEmail),
    switchMap((action: {payload: UpdateEmailPayload}) => this.projectService.updateEmail(action.payload)),
    switchMap((email: Email) => of(new UpdateEmailSuccess(email)))
  );

  @Effect()
  deleteEmail$ = this.actions$.pipe(
    ofType<DeleteEmail>(EProjectActions.DeleteEmail),
    switchMap((action: {payload: DeleteEmailPayload}) => this.projectService.deleteEmail(action.payload)),
    switchMap((payload: DeleteEmailPayload) => of(new DeleteEmailSuccess(payload)))
  );

  constructor(private projectService: ProjectService, private actions$: Actions) {}
}
