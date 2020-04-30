import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';

import { NewsService } from '../../services/news.service';
import {
  CreateFormat,
  CreateFormatSuccess,
  CreateHashtag,
  CreateHashtagSuccess,
  CreateProject,
  CreateProjectSuccess,
  ENewsActions,
  GetCharactersSuccess,
  GetContractorsSuccess,
  GetFormatsSuccess,
  GetHashtagsSuccess,
  GetMethodsSuccess,
  GetProject,
  GetProjectConfiguration,
  GetProjects,
  GetProjectsSuccess,
  GetProjectSuccess,
  UpdateProject,
  UpdateProjectSuccess,
} from '../actions/news.actions';
import { GetAllResponse } from '../../models/responses/news/get-all-response';
import { Hashtag } from '../../models/instances/hashtag';
import { Format } from '../../models/instances/format';
import { Project } from '../../models/instances/project';
import { CreateHashtagPayload } from '../../models/payloads/news/hashtag/create';
import { CreatePostFormatPayload } from '../../models/payloads/news/format/create';
import { CreateProjectPayload } from '../../models/payloads/news/project/create';
import { UpdateProjectPayload } from '../../models/payloads/news/project/update';

@Injectable({
  providedIn: 'root',
})
export class NewsEffects {
  @Effect()
  getProjectConfiguration$ = this.actions$.pipe(
    ofType<GetProjectConfiguration>(ENewsActions.GetProjectConfiguration),
    switchMap(() => this.newsService.getProjectConfiguration()),
    mergeMap((response: GetAllResponse) => [
      new GetHashtagsSuccess(response.hashtags),
      new GetMethodsSuccess(response.burstMethods),
      new GetFormatsSuccess(response.formats),
      new GetCharactersSuccess(response.characters),
      new GetContractorsSuccess(response.contractors),
    ])
  );

  @Effect()
  createHashtag$ = this.actions$.pipe(
    ofType<CreateHashtag>(ENewsActions.CreateHashtag),
    switchMap((action: {payload: CreateHashtagPayload}) => this.newsService.createHashtag(action.payload)),
    switchMap((hashtag: Hashtag) => of(new CreateHashtagSuccess(hashtag)))
  );

  @Effect()
  createFormat$ = this.actions$.pipe(
    ofType<CreateFormat>(ENewsActions.CreateFormat),
    switchMap((action: {payload: CreatePostFormatPayload}) => this.newsService.createFormat(action.payload)),
    switchMap((format: Format) => of(new CreateFormatSuccess(format)))
  );

  @Effect()
  createProject$ = this.actions$.pipe(
    ofType<CreateProject>(ENewsActions.CreateProject),
    switchMap((action: {payload: CreateProjectPayload}) => this.newsService.createProject(action.payload)),
    switchMap((project: Project) => of(new CreateProjectSuccess(project)))
  );

  @Effect()
  updateProject$ = this.actions$.pipe(
    ofType<UpdateProject>(ENewsActions.UpdateProject),
    switchMap((action: {payload: UpdateProjectPayload}) => this.newsService.updateProject(action.payload)),
    switchMap((project: Project) => of(new UpdateProjectSuccess(project)))
  );

  @Effect()
  getProject$ = this.actions$.pipe(
    ofType<GetProject>(ENewsActions.GetProject),
    switchMap((action: {payload: Project}) => this.newsService.getProject(action.payload)),
    switchMap((project: Project) => of(new GetProjectSuccess(project)))
  );

  @Effect()
  getProjects$ = this.actions$.pipe(
    ofType<GetProjects>(ENewsActions.GetProjects),
    switchMap(() => this.newsService.getProjects()),
    switchMap((projects: Project[]) => of(new GetProjectsSuccess(projects)))
  );

  constructor(private newsService: NewsService, private actions$: Actions) {}
}
