import { Action } from '@ngrx/store';
import { Publication } from '@models/instances/publication';
import { CreatePublishPayload } from '@models/payloads/publication/publish/create';
import { UpdatePublishPayload } from '@models/payloads/publication/publish/update';
import { DeletePublishPayload } from '@models/payloads/publication/publish/delete';
import { CreateCommentPayload } from '@models/payloads/publication/comment/create';
import { DeleteCommentPayload } from '@models/payloads/publication/comment/delete';
import { PublicationBlackList } from '@models/instances/publication-black-list';
import { CreatePublicationBlackListPayload } from '@models/payloads/publication/notPublish/create';
import { DeletePublicationBlackListPayload } from '@models/payloads/publication/notPublish/delete';
import { UpdatePublicationBlackListPayload } from '@models/payloads/publication/notPublish/update';
import { UpdateCommentPayload } from '@models/payloads/publication/comment/update';
import { Comment } from '@models/instances/comment';
import { GetPublicationPayload } from '@models/payloads/publication/publish/get';
import { GetPublicationBlackListPayload } from '@models/payloads/publication/notPublish/get';
import { GetCommentPayload } from '@models/payloads/publication/comment/get';

export enum EPublicationActions {
  GetPublications = '[Publication] Get publications',
  GetPublicationsSuccess = '[Publication] Get publications success',

  CreatePublication = '[Publication] Create publication',
  CreatePublicationSuccess = '[Publication] Create publication success',

  UpdatePublication = '[Publication] Update publication',
  UpdatePublicationSuccess = '[Publication] Update publication success',

  DeletePublication = '[Publication] Delete publication',
  DeletePublicationSuccess = '[Publication] Delete publication success',

  GetPublicationBlackList = '[Publication] Get publications black list',
  GetPublicationBlackListSuccess = '[Publication] Get publications black list success',

  CreateNotPublication = '[Publication] Create not publication',
  CreateNotPublicationSuccess = '[Publication] Create not publication success',

  UpdateNotPublication = '[Publication] Update not publication',
  UpdateNotPublicationSuccess = '[Publication] Update not publication success',

  DeleteNotPublication = '[Publication] Delete not publication',
  DeleteNotPublicationSuccess = '[Publication] Delete not publication success',


  GetComments = '[Publication] Get comments',
  GetCommentsSuccess = '[Publication] Get comments success',

  CreateComment = '[Publication] Create comment',
  CreateCommentSuccess = '[Publication] Create comment success',

  UpdateComment = '[Publication] Update comment',
  UpdateCommentSuccess = '[Publication] Update comment success',

  DeleteComment = '[Publication] Delete comment',
  DeleteCommentSuccess = '[Publication] Delete comment success',
}

export class GetPublications implements Action {
  public readonly type = EPublicationActions.GetPublications;

  constructor(public payload: GetPublicationPayload) {
  }
}

export class GetPublicationsSuccess implements Action {
  public readonly type = EPublicationActions.GetPublicationsSuccess;

  constructor(public payload: Publication[]) {
  }
}

export class CreatePublication implements Action {
  public readonly type = EPublicationActions.CreatePublication;

  constructor(public payload: CreatePublishPayload) {
  }
}

export class CreatePublicationSuccess implements Action {
  public readonly type = EPublicationActions.CreatePublicationSuccess;

  constructor(public payload: Publication) {
  }
}


export class UpdatePublication implements Action {
  public readonly type = EPublicationActions.UpdatePublication;

  constructor(public payload: UpdatePublishPayload) {
  }
}

export class UpdatePublicationSuccess implements Action {
  public readonly type = EPublicationActions.UpdatePublicationSuccess;

  constructor(public payload: Publication) {
  }
}


export class DeletePublication implements Action {
  public readonly type = EPublicationActions.DeletePublication;

  constructor(public payload: DeletePublishPayload) {
  }
}

export class DeletePublicationSuccess implements Action {
  public readonly type = EPublicationActions.DeletePublicationSuccess;

  constructor(public payload: DeletePublishPayload) {
  }
}


export class GetPublicationBlackList implements Action {
  public readonly type = EPublicationActions.GetPublicationBlackList;

  constructor(public payload: GetPublicationBlackListPayload) {
  }
}

export class GetPublicationBlackListSuccess implements Action {
  public readonly type = EPublicationActions.GetPublicationBlackListSuccess;

  constructor(public payload: PublicationBlackList[]) {
  }
}

export class CreateNotPublication implements Action {
  public readonly type = EPublicationActions.CreateNotPublication;

  constructor(public payload: CreatePublicationBlackListPayload) {
  }
}

export class CreateNotPublicationSuccess implements Action {
  public readonly type = EPublicationActions.CreateNotPublicationSuccess;

  constructor(public payload: PublicationBlackList) {
  }
}


export class UpdateNotPublication implements Action {
  public readonly type = EPublicationActions.UpdateNotPublication;

  constructor(public payload: UpdatePublicationBlackListPayload) {
  }
}

export class UpdateNotPublicationSuccess implements Action {
  public readonly type = EPublicationActions.UpdateNotPublicationSuccess;

  constructor(public payload: PublicationBlackList) {
  }
}


export class DeleteNotPublication implements Action {
  public readonly type = EPublicationActions.DeleteNotPublication;

  constructor(public payload: DeletePublicationBlackListPayload) {
  }
}

export class DeleteNotPublicationSuccess implements Action {
  public readonly type = EPublicationActions.DeleteNotPublicationSuccess;

  constructor(public payload: DeletePublicationBlackListPayload) {
  }
}


export class GetComments implements Action {
  public readonly type = EPublicationActions.GetComments;

  constructor(public payload: GetCommentPayload) {
  }
}

export class GetCommentsSuccess implements Action {
  public readonly type = EPublicationActions.GetCommentsSuccess;

  constructor(public payload: Comment[]) {
  }
}

export class CreateComment implements Action {
  public readonly type = EPublicationActions.CreateComment;

  constructor(public payload: CreateCommentPayload) {
  }
}

export class CreateCommentSuccess implements Action {
  public readonly type = EPublicationActions.CreateCommentSuccess;

  constructor(public payload: Comment) {
  }
}


export class UpdateComment implements Action {
  public readonly type = EPublicationActions.UpdateComment;

  constructor(public payload: UpdateCommentPayload) {
  }
}

export class UpdateCommentSuccess implements Action {
  public readonly type = EPublicationActions.UpdateCommentSuccess;

  constructor(public payload: Comment) {
  }
}


export class DeleteComment implements Action {
  public readonly type = EPublicationActions.DeleteComment;

  constructor(public payload: DeleteCommentPayload) {
  }
}

export class DeleteCommentSuccess implements Action {
  public readonly type = EPublicationActions.DeleteCommentSuccess;

  constructor(public payload: DeleteCommentPayload) {
  }
}


export type PublicationActions =
  | GetPublications
  | GetPublicationsSuccess
  | CreatePublication
  | CreatePublicationSuccess
  | UpdatePublication
  | UpdatePublicationSuccess
  | DeletePublication
  | DeletePublicationSuccess

  | GetPublicationBlackList
  | GetPublicationBlackListSuccess
  | CreateNotPublication
  | CreateNotPublicationSuccess
  | UpdateNotPublication
  | UpdateNotPublicationSuccess
  | DeleteNotPublication
  | DeleteNotPublicationSuccess

  | GetComments
  | GetCommentsSuccess
  | CreateComment
  | CreateCommentSuccess
  | UpdateComment
  | UpdateCommentSuccess
  | DeleteComment
  | DeleteCommentSuccess;
