import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from '@services/project.service';
import {
  CreateEmail,
  CreateEmailSuccess,
  CreateNewsProject,
  CreateNewsProjectSuccess,
  DeleteEmail,
  DeleteEmailSuccess,
  DeleteNewsProject, DeleteNewsProjectSuccess,
  EProjectActions,
  GetEmails,
  GetEmailsSuccess,
  GetNewsProject,
  GetNewsProjects,
  GetNewsProjectsSuccess,
  GetNewsProjectSuccess, GetNewsWaves, GetNewsWavesSuccess,
  UpdateEmail,
  UpdateEmailSuccess,
  UpdateNewsProject,
  UpdateNewsProjectSuccess
} from '../actions/project.actions';
import { Email } from '@models/instances/email';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { UpdateEmailPayload } from '@models/payloads/project/email/update';
import { DeleteEmailPayload } from '@models/payloads/project/email/delete';
import { NewsProject } from '@models/instances/news-project';
import { CreateNewsProjectPayload } from '@models/payloads/project/news-project/create';
import { UpdateNewsProjectPayload } from '@models/payloads/project/news-project/update';
import { GetNewsProjectPayload } from '@models/payloads/project/news-project/get';
import { DeleteNewsProjectPayload } from '@models/payloads/project/news-project/delete';
import { NewsWaves } from '@models/instances/news-waves';
import { GetNewsWavesPayload } from '@models/payloads/project/news/get';

@Injectable({
  providedIn: 'root'
})
export class ProjectEffects {
  @Effect()
  getEmails$ = this.actions$.pipe(
    ofType<GetEmails>(EProjectActions.GetEmails),
    switchMap((action) => this.projectService.getEmails()),
    switchMap((emails: Email[]) => of(new GetEmailsSuccess(emails)))
  );

  @Effect()
  createEmail$ = this.actions$.pipe(
    ofType<CreateEmail>(EProjectActions.CreateEmail),
    switchMap((action: { payload: CreateEmailPayload }) => this.projectService.createEmail(action.payload)),
    switchMap((email: Email) => of(new CreateEmailSuccess(email)))
  );

  @Effect()
  updateEmail$ = this.actions$.pipe(
    ofType<UpdateEmail>(EProjectActions.UpdateEmail),
    switchMap((action: { payload: UpdateEmailPayload }) => this.projectService.updateEmail(action.payload)),
    switchMap((email: Email) => of(new UpdateEmailSuccess(email)))
  );

  @Effect()
  deleteEmail$ = this.actions$.pipe(
    ofType<DeleteEmail>(EProjectActions.DeleteEmail),
    switchMap((action: { payload: DeleteEmailPayload }) => this.projectService.deleteEmail(action.payload)),
    switchMap((payload: DeleteEmailPayload) => of(new DeleteEmailSuccess(payload)))
  );

  @Effect()
  getNewsProjects$ = this.actions$.pipe(
    ofType<GetNewsProjects>(EProjectActions.GetNewsProjects),
    switchMap((action) => this.projectService.getNewsProjects()),
    switchMap((payload: NewsProject[]) => of(new GetNewsProjectsSuccess(payload)))
  );


  @Effect()
  createNewsProject$ = this.actions$.pipe(
    ofType<CreateNewsProject>(EProjectActions.CreateNewsProject),
    switchMap((action: { payload: CreateNewsProjectPayload }) => this.projectService.createNewsProject(action.payload)),
    switchMap((payload: NewsProject) => of(new CreateNewsProjectSuccess(payload)))
  );


  @Effect()
  updateNewsProjects$ = this.actions$.pipe(
    ofType<UpdateNewsProject>(EProjectActions.UpdateNewsProject),
    switchMap((action: { payload: UpdateNewsProjectPayload }) => this.projectService.updateNewsProject(action.payload)),
    switchMap((payload: NewsProject) => of(new UpdateNewsProjectSuccess(payload)))
  );


  @Effect()
  getNewsProject$ = this.actions$.pipe(
    ofType<GetNewsProject>(EProjectActions.GetNewsProject),
    switchMap((action: { payload: GetNewsProjectPayload }) => this.projectService.getNewsProject(action.payload)),
    switchMap((payload: NewsProject) => of(new GetNewsProjectSuccess(payload)))
  );


  @Effect()
  getNewsWaves$ = this.actions$.pipe(
    ofType<GetNewsWaves>(EProjectActions.GetNewsWaves),
    switchMap((action: { payload: GetNewsWavesPayload }) => this.projectService.getNewsWaves(action.payload)),
    switchMap((payload: NewsWaves[]) => of(new GetNewsWavesSuccess(payload)))
  );


  @Effect()
  deleteNewsProject$ = this.actions$.pipe(
    ofType<DeleteNewsProject>(EProjectActions.DeleteNewsProject),
    switchMap((action: { payload: DeleteNewsProjectPayload }) => this.projectService.deleteNewsProject(action.payload)),
    switchMap((payload: DeleteNewsProjectPayload) => of(new DeleteNewsProjectSuccess(payload)))
  );


  constructor(private projectService: ProjectService, private actions$: Actions) {
  }
}
