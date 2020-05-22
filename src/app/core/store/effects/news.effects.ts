import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';

import { NewsService } from '../../services/news.service';
import {
  CreateFormat, CreateFormats, CreateFormatsSuccess,
  CreateFormatSuccess,
  CreateHashtag,
  CreateHashtagSuccess,
  CreateProject,
  CreateProjectSuccess, DeleteFormat, DeleteFormatSuccess,
  ENewsActions,
  GetCharactersSuccess,
  GetContractorsSuccess,
  GetFormatsSuccess,
  GetHashtagsSuccess,
  GetMethodsSuccess, GetPostFormat, GetPostFormats, GetPostFormatsSuccess, GetPostFormatSuccess,
  GetProject,
  GetProjectConfiguration,
  GetProjects,
  GetProjectsSuccess,
  GetProjectSuccess, UpdateFormat, UpdateFormatSuccess,
  UpdateProject,
  UpdateProjectSuccess
} from '../actions/news.actions';
import { GetAllResponse } from '../../models/responses/news/project/get-all-response';
import { Hashtag } from '../../models/instances/hashtag';
import { Format } from '../../models/instances/format';
import { Project } from '../../models/instances/project';
import { CreateHashtagPayload } from '../../models/payloads/news/hashtag/create';
import { CreateProjectPayload } from '../../models/payloads/news/project/create';
import { UpdateProjectPayload } from '../../models/payloads/news/project/update';
import { CreatePostsFormatResponse } from '../../models/responses/news/format/create-post-format';
import { CreatePostsFormatPayload } from '../../models/payloads/news/format/create';
import { CreatePostFormatPayload } from '../../models/payloads/news/format/create-post-format';
import { PostFormatListSet } from '../../models/instances/contractor';
import { UpdatePostFormatPayload } from '../../models/payloads/news/format/update-post-format';
import { DeletePostFormatPayload } from '../../models/payloads/news/format/delete-post-format';
import { GetPostFormatPayload } from '../../models/payloads/news/format/get-post-format';

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

  @Effect()
  createFormat$ = this.actions$.pipe(
    ofType<CreateFormat>(ENewsActions.CreateFormat),
    switchMap((action: {payload: CreatePostFormatPayload}) => this.newsService.createPostFormat(action.payload)),
    switchMap((format: PostFormatListSet) => of(new CreateFormatSuccess(format)))
  );

  @Effect()
  createFormats$ = this.actions$.pipe(
    ofType<CreateFormats>(ENewsActions.CreateFormats),
    switchMap((action: {payload: CreatePostsFormatPayload}) => this.newsService.createFormat(action.payload)),
    switchMap((format: Format) => of(new CreateFormatsSuccess(format)))
  );

  @Effect()
  updateFormat$ = this.actions$.pipe(
    ofType<UpdateFormat>(ENewsActions.UpdateFormat),
    switchMap((action: {payload: UpdatePostFormatPayload}) => this.newsService.updatePostFormat(action.payload)),
    switchMap((format: PostFormatListSet) => of(new UpdateFormatSuccess(format)))
  );

  @Effect()
  deleteFormat$ = this.actions$.pipe(
    ofType<DeleteFormat>(ENewsActions.DeleteFormat),
    switchMap((action: {payload: DeletePostFormatPayload}) => this.newsService.deletePostFormat(action.payload)),
    switchMap((format: Format) => of(new DeleteFormatSuccess(format)))
  );

  @Effect()
  getFormats$ = this.actions$.pipe(
    ofType<GetPostFormats>(ENewsActions.GetPostFormats),
    switchMap((action) => this.newsService.getAllPostFormats()),
    switchMap((formats: PostFormatListSet[]) => of(new GetPostFormatsSuccess(formats)))
  );

  @Effect()
  getFormat$ = this.actions$.pipe(
    ofType<GetPostFormat>(ENewsActions.GetPostFormat),
    switchMap((action: {payload: GetPostFormatPayload}) => this.newsService.getPostFormats(action.payload)),
    switchMap((format: PostFormatListSet[]) => of(new GetPostFormatSuccess(format)))
  );


  constructor(private newsService: NewsService, private actions$: Actions) {}
}
