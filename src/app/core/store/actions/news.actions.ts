import { Action } from '@ngrx/store';
import { Hashtag } from '../../models/instances/hashtag';
import { Character } from '../../models/instances/character';
import { Method } from '../../models/instances/method';
import { Format } from '../../models/instances/format';
import { Contractor, PostFormatListSet } from '../../models/instances/contractor';
import { Project } from '../../models/instances/project';
import { UpdatePostFormatPayload } from '../../models/payloads/news/format/update-post-format';
import { GetPostFormatPayload } from '../../models/payloads/news/format/get-post-format';
import { DeletePostFormatPayload } from '../../models/payloads/news/format/delete-post-format';
import { DeletePostFormatResponse } from '../../models/responses/news/format/delete-post-format';
import { CreatePostsFormatPayload } from '../../models/payloads/news/format/create';
import { CreatePostFormatPayload } from '../../models/payloads/news/format/create-post-format';
import { NewsWaves } from '../../models/instances/news-waves';
import { GetNewsWavesPayload } from '../../models/payloads/news/news-waves/get';
import { CreateNewsWavesPayload } from '../../models/payloads/news/news-waves/create';
import { UpdateNewsWavesPayload } from '../../models/payloads/news/news-waves/update';
import { DeleteNewsWavesPayload } from '../../models/payloads/news/news-waves/delete';

export enum ENewsActions {
  GetProjectConfiguration = '[News] Get project configuration',
  GetProject = '[News] Get project',
  GetProjectSuccess = '[News] Get project success',
  UpdateProject = '[News] Update project',
  UpdateProjectSuccess = '[News] Update project success',
  GetProjects = '[News] Get projects',
  GetProjectsSuccess = '[News] Get projects success',
  CreateProject = '[News] Create project',
  CreateProjectSuccess = '[News] Create project success',
  GetContractorsSuccess = '[News] Get contractors success',
  GetHashtagsSuccess = '[News] Get hashtags success',
  GetFormatsSuccess = '[News] Get formats success',
  GetCharactersSuccess = '[News] Get characters success',
  GetMethodsSuccess = '[News] Get methods success',
  CreateHashtag = '[News] Create hashtag',
  CreateHashtagSuccess = '[News] Create hashtag success',

  CreateFormats = '[News] Create formats',
  CreateFormatsSuccess = '[News] Create formats success',
  CreateFormat = '[News] Create format',
  CreateFormatSuccess = '[News] Create format success',
  UpdateFormat = '[News] Update format',
  UpdateFormatSuccess = '[News] Update format success',
  GetPostFormats = '[News] Get post formats',
  GetPostFormatsSuccess = '[News] Get post formats success',
  GetPostFormat = '[News] Get post format',
  GetPostFormatSuccess = '[News] Get post format',
  DeleteFormat = '[News] Delete format',
  DeleteFormatSuccess = '[News] Delete format success',

  GetNewsWaves = '[News] Get news waves',
  GetNewsWavesSuccess = '[News] Get news waves success',
  GetNewsWave = '[News] Get news wave',
  GetNewsWaveSuccess = '[News] Get news wave success',
  CreateNewsWave = '[News] Create news wave',
  CreateNewsWaveSuccess = '[News] Create news wave success',
  UpdateNewsWave = '[News] Update news wave',
  UpdateNewsWaveSuccess = '[News] Update news wave success',
  DeleteNewsWave = '[News] Delete news wave',
  DeleteNewsWaveSuccess = '[News] Delete news wave success',

}

export class GetProject implements Action {
  public readonly type = ENewsActions.GetProject;

  constructor(public payload) {
  }
}

export class UpdateProject implements Action {
  public readonly type = ENewsActions.UpdateProject;

  constructor(public payload) {
  }
}

export class UpdateProjectSuccess implements Action {
  public readonly type = ENewsActions.UpdateProjectSuccess;

  constructor(public payload) {
  }
}

export class GetProjects implements Action {
  public readonly type = ENewsActions.GetProjects;

  constructor() {
  }
}

export class GetProjectsSuccess implements Action {
  public readonly type = ENewsActions.GetProjectsSuccess;

  constructor(public payload: Project[]) {
  }
}

export class CreateProject implements Action {
  public readonly type = ENewsActions.CreateProject;

  constructor(public payload) {
  }
}

export class CreateProjectSuccess implements Action {
  public readonly type = ENewsActions.CreateProjectSuccess;

  constructor(public payload) {
  }
}

export class GetProjectConfiguration implements Action {
  public readonly type = ENewsActions.GetProjectConfiguration;

  constructor() {
  }
}

export class GetProjectSuccess implements Action {
  public readonly type = ENewsActions.GetProjectSuccess;

  constructor(public payload: Project) {
  }
}

export class GetHashtagsSuccess implements Action {
  public readonly type = ENewsActions.GetHashtagsSuccess;

  constructor(public payload: Hashtag[]) {
  }
}

export class GetContractorsSuccess implements Action {
  public readonly type = ENewsActions.GetContractorsSuccess;

  constructor(public payload: Contractor[]) {
  }
}

export class GetCharactersSuccess implements Action {
  public readonly type = ENewsActions.GetCharactersSuccess;

  constructor(public payload: Character[]) {
  }
}

export class GetMethodsSuccess implements Action {
  public readonly type = ENewsActions.GetMethodsSuccess;

  constructor(public payload: Method[]) {
  }
}

export class GetFormatsSuccess implements Action {
  public readonly type = ENewsActions.GetFormatsSuccess;

  constructor(public payload: Format[]) {
  }
}

export class CreateHashtag implements Action {
  public readonly type = ENewsActions.CreateHashtag;

  constructor(public payload) {
  }
}

export class CreateHashtagSuccess implements Action {
  public readonly type = ENewsActions.CreateHashtagSuccess;

  constructor(public payload: Hashtag) {
  }
}

export class CreateFormats implements Action {
  public readonly type = ENewsActions.CreateFormats;

  constructor(public payload: CreatePostsFormatPayload) {
  }
}

export class CreateFormatsSuccess implements Action {
  public readonly type = ENewsActions.CreateFormatsSuccess;

  constructor(public payload: Format) {
  }
}


export class CreateFormat implements Action {
  public readonly type = ENewsActions.CreateFormat;

  constructor(public payload: CreatePostFormatPayload) {
  }
}

export class CreateFormatSuccess implements Action {
  public readonly type = ENewsActions.CreateFormatSuccess;

  constructor(public payload: PostFormatListSet) {
  }
}


export class UpdateFormat implements Action {
  public readonly type = ENewsActions.UpdateFormat;

  constructor(public payload: UpdatePostFormatPayload) {
  }
}

export class UpdateFormatSuccess implements Action {
  public readonly type = ENewsActions.UpdateFormatSuccess;

  constructor(public payload: PostFormatListSet) {
  }
}

export class GetPostFormats implements Action {
  public readonly type = ENewsActions.GetPostFormats;

  constructor() {
  }
}

export class GetPostFormatsSuccess implements Action {
  public readonly type = ENewsActions.GetPostFormatsSuccess;

  constructor(public payload: PostFormatListSet[]) {
  }
}

export class GetPostFormat implements Action {
  public readonly type = ENewsActions.GetPostFormat;

  constructor(public payload: GetPostFormatPayload) {
  }
}

export class GetPostFormatSuccess implements Action {
  public readonly type = ENewsActions.GetPostFormatSuccess;

  constructor(public payload: PostFormatListSet[]) {
  }
}

export class DeleteFormat implements Action {
  public readonly type = ENewsActions.DeleteFormat;

  constructor(public payload: DeletePostFormatPayload) {
  }
}

export class DeleteFormatSuccess implements Action {
  public readonly type = ENewsActions.DeleteFormatSuccess;

  constructor(public payload: DeletePostFormatResponse) {
  }
}

export class GetNewsWaves implements Action {
  public readonly type = ENewsActions.GetNewsWaves;

  constructor() {
  }
}

export class GetNewsWavesSuccess implements Action {
  public readonly type = ENewsActions.GetNewsWavesSuccess;

  constructor(public payload: NewsWaves[]) {
  }
}

export class GetNewsWave implements Action {
  public readonly type = ENewsActions.GetNewsWave;

  constructor(public payload: GetNewsWavesPayload) {
  }
}

export class GetNewsWaveSuccess implements Action {
  public readonly type = ENewsActions.GetNewsWaveSuccess;

  constructor(public payload: NewsWaves) {
  }
}


export class CreateNewsWave implements Action {
  public readonly type = ENewsActions.CreateNewsWave;

  constructor(public payload: CreateNewsWavesPayload) {
  }
}

export class CreateNewsWaveSuccess implements Action {
  public readonly type = ENewsActions.CreateNewsWaveSuccess;

  constructor(public payload: NewsWaves) {
  }
}

export class UpdateNewsWave implements Action {
  public readonly type = ENewsActions.UpdateNewsWave;

  constructor(public payload: UpdateNewsWavesPayload) {
  }
}

export class UpdateNewsWaveSuccess implements Action {
  public readonly type = ENewsActions.UpdateNewsWaveSuccess;

  constructor(public payload: NewsWaves) {
  }
}

export class DeleteNewsWave implements Action {
  public readonly type = ENewsActions.DeleteNewsWave;

  constructor(public payload: DeleteNewsWavesPayload) {
  }
}

export class DeleteNewsWaveSuccess implements Action {
  public readonly type = ENewsActions.DeleteNewsWaveSuccess;

  constructor(public payload: DeleteNewsWavesPayload) {
  }
}

export type NewsActions =
  | CreateFormats
  | CreateFormatsSuccess
  | CreateHashtag
  | CreateHashtagSuccess
  | GetCharactersSuccess
  | GetFormatsSuccess
  | GetHashtagsSuccess
  | GetMethodsSuccess
  | GetProjectConfiguration
  | GetContractorsSuccess
  | GetProject
  | CreateProjectSuccess
  | CreateProject
  | GetProjectSuccess
  | GetProjects
  | GetProjectsSuccess
  | UpdateProjectSuccess
  | UpdateProject

  | CreateFormat
  | CreateFormatSuccess
  | UpdateFormat
  | UpdateFormatSuccess
  | GetPostFormats
  | GetPostFormatsSuccess
  | GetPostFormat
  | GetPostFormatSuccess
  | DeleteFormat
  | DeleteFormatSuccess

  | GetNewsWaves
  | GetNewsWavesSuccess
  | GetNewsWave
  | GetNewsWaveSuccess
  | CreateNewsWave
  | CreateNewsWaveSuccess
  | UpdateNewsWave
  | UpdateNewsWaveSuccess
  | DeleteNewsWave
  | DeleteNewsWaveSuccess;
