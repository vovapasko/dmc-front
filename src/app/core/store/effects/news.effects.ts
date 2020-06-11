import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';

import { NewsService } from '../../services/news.service';
import {
  CreateFormat,
  CreateFormats,
  CreateFormatsSuccess,
  CreateFormatSuccess,
  CreateHashtag,
  CreateHashtagSuccess, CreateNewsWave, CreateNewsWaveSuccess,
  CreateProject,
  CreateProjectSuccess,
  DeleteFormat,
  DeleteFormatSuccess,
  ENewsActions,
  GetCharactersSuccess,
  GetContractorsSuccess,
  GetFormatsSuccess,
  GetHashtagsSuccess,
  GetMethodsSuccess, GetNewsWave,
  GetNewsWaves,
  GetNewsWavesSuccess, GetNewsWaveSuccess,
  GetPostFormat,
  GetPostFormats,
  GetPostFormatsSuccess,
  GetPostFormatSuccess,
  GetProject,
  GetProjectConfiguration,
  GetProjects,
  GetProjectsSuccess,
  GetProjectSuccess,
  UpdateFormat,
  UpdateFormatSuccess, UpdateNewsWave, UpdateNewsWaveSuccess,
  UpdateProject,
  UpdateProjectSuccess,
  DeleteNewsWave, DeleteNewsWaveSuccess
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
import { NewsWaves } from '../../models/instances/news-waves';
import { GetNewsWavesPayload } from '../../models/payloads/news/news-waves/get';
import { CreateNewsWavesPayload } from '../../models/payloads/news/news-waves/create';
import { UpdateNewsWavesPayload } from '../../models/payloads/news/news-waves/update';
import { DeleteNewsWavesPayload } from '../../models/payloads/news/news-waves/delete';

@Injectable({
  providedIn: 'root'
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
      new GetContractorsSuccess(response.contractors)
    ])
  );

  @Effect()
  createHashtag$ = this.actions$.pipe(
    ofType<CreateHashtag>(ENewsActions.CreateHashtag),
    switchMap((action: { payload: CreateHashtagPayload }) => this.newsService.createHashtag(action.payload)),
    switchMap((hashtag: Hashtag) => of(new CreateHashtagSuccess(hashtag)))
  );

  @Effect()
  createProject$ = this.actions$.pipe(
    ofType<CreateProject>(ENewsActions.CreateProject),
    switchMap((action: { payload: CreateProjectPayload }) => this.newsService.createProject(action.payload)),
    switchMap((project: Project) => of(new CreateProjectSuccess(project)))
  );

  @Effect()
  updateProject$ = this.actions$.pipe(
    ofType<UpdateProject>(ENewsActions.UpdateProject),
    switchMap((action: { payload: UpdateProjectPayload }) => this.newsService.updateProject(action.payload)),
    switchMap((project: Project) => of(new UpdateProjectSuccess(project)))
  );

  @Effect()
  getProject$ = this.actions$.pipe(
    ofType<GetProject>(ENewsActions.GetProject),
    switchMap((action: { payload: Project }) => this.newsService.getProject(action.payload)),
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
    switchMap((action: { payload: CreatePostFormatPayload }) => this.newsService.createPostFormat(action.payload)),
    switchMap((format: PostFormatListSet) => of(new CreateFormatSuccess(format)))
  );

  @Effect()
  createFormats$ = this.actions$.pipe(
    ofType<CreateFormats>(ENewsActions.CreateFormats),
    switchMap((action: { payload: CreatePostsFormatPayload }) => this.newsService.createFormat(action.payload)),
    switchMap((format: Format) => of(new CreateFormatsSuccess(format)))
  );

  @Effect()
  updateFormat$ = this.actions$.pipe(
    ofType<UpdateFormat>(ENewsActions.UpdateFormat),
    switchMap((action: { payload: UpdatePostFormatPayload }) => this.newsService.updatePostFormat(action.payload)),
    switchMap((format: PostFormatListSet) => of(new UpdateFormatSuccess(format)))
  );

  @Effect()
  deleteFormat$ = this.actions$.pipe(
    ofType<DeleteFormat>(ENewsActions.DeleteFormat),
    switchMap((action: { payload: DeletePostFormatPayload }) => this.newsService.deletePostFormat(action.payload)),
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
    switchMap((action: { payload: GetPostFormatPayload }) => this.newsService.getPostFormats(action.payload)),
    switchMap((format: PostFormatListSet[]) => of(new GetPostFormatSuccess(format)))
  );

  @Effect()
  getNewsWaves$ = this.actions$.pipe(
    ofType<GetNewsWaves>(ENewsActions.GetNewsWaves),
    switchMap((action) => this.newsService.getAllNewsWaves()),
    switchMap((newsWaves: NewsWaves[]) => of(new GetNewsWavesSuccess(newsWaves)))
  );

  @Effect()
  getNewsWave$ = this.actions$.pipe(
    ofType<GetNewsWave>(ENewsActions.GetNewsWave),
    switchMap((action: { payload: GetNewsWavesPayload }) => this.newsService.getNewsWave(action.payload)),
    switchMap((newsWave: NewsWaves) => of(new GetNewsWaveSuccess(newsWave)))
  );

  @Effect()
  createNewsWave$ = this.actions$.pipe(
    ofType<CreateNewsWave>(ENewsActions.CreateNewsWave),
    switchMap((action: { payload: CreateNewsWavesPayload }) => this.newsService.createNewsWave(action.payload)),
    switchMap((newsWave: NewsWaves) => of(new CreateNewsWaveSuccess(newsWave)))
  );


  @Effect()
  updateNewsWave$ = this.actions$.pipe(
    ofType<UpdateNewsWave>(ENewsActions.UpdateNewsWave),
    switchMap((action: { payload: UpdateNewsWavesPayload }) => this.newsService.updateNewsWave(action.payload)),
    switchMap((newsWave: NewsWaves) => of(new UpdateNewsWaveSuccess(newsWave)))
  );


  @Effect()
  deleteNewsWave$ = this.actions$.pipe(
    ofType<DeleteNewsWave>(ENewsActions.DeleteNewsWave),
    switchMap((action: { payload: DeleteNewsWavesPayload }) => this.newsService.deleteNewsWave(action.payload)),
    switchMap((payload: DeleteNewsWavesPayload) => of(new DeleteNewsWaveSuccess(payload)))
  );

  constructor(private newsService: NewsService, private actions$: Actions) {
  }
}
