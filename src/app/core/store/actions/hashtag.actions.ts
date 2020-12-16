import { Action } from '@ngrx/store';
import { Hashtag } from '@models/instances/hashtag';
import { CreateHashtagPayload } from '@models/payloads/news/hashtag/create';
import { UpdateHashtagPayload } from '@models/payloads/news/hashtag/update';
import { DeleteHashtagPayload } from '@models/payloads/news/hashtag/delete';
import { GetHashtagsPayload } from '@models/payloads/news/hashtag/get';


export enum EHashtagActions {
  GetHashtags = '[Hashtag] Get hashtags',
  GetHashtagsSuccess = '[Hashtag] Get hashtags success',
  CreateHashtag = '[Hashtag] Create hashtag',
  CreateHashtagSuccess = '[Hashtag] Create hashtag success',
  UpdateHashtag = '[Hashtag] Update hashtag',
  UpdateHashtagSuccess = '[Hashtag] Update hashtag success',
  DeleteHashtag = '[Hashtag] Delete hashtag',
  DeleteHashtagSuccess = '[Hashtag] Delete hashtag success',
  SelectHashtag = '[Hashtag] Select hashtag',
  SelectHashtagSuccess = '[Hashtag] Select hashtag success',
}

export class GetHashtags implements Action {
  public readonly type = EHashtagActions.GetHashtags;

  constructor(public payload: GetHashtagsPayload) {
  }
}

export class GetHashtagsSuccess implements Action {
  public readonly type = EHashtagActions.GetHashtagsSuccess;

  constructor(public payload: Hashtag[]) {
  }
}


export class CreateHashtag implements Action {
  public readonly type = EHashtagActions.CreateHashtag;

  constructor(public payload: CreateHashtagPayload) {
  }
}

export class CreateHashtagSuccess implements Action {
  public readonly type = EHashtagActions.CreateHashtagSuccess;

  constructor(public payload: Hashtag) {
  }
}


export class UpdateHashtag implements Action {
  public readonly type = EHashtagActions.UpdateHashtag;

  constructor(public payload: UpdateHashtagPayload) {
  }
}

export class UpdateHashtagSuccess implements Action {
  public readonly type = EHashtagActions.UpdateHashtagSuccess;

  constructor(public payload: Hashtag) {
  }
}

export class DeleteHashtag implements Action {
  public readonly type = EHashtagActions.DeleteHashtag;

  constructor(public payload: DeleteHashtagPayload) {
  }
}

export class DeleteHashtagSuccess implements Action {
  public readonly type = EHashtagActions.DeleteHashtagSuccess;

  constructor(public payload: DeleteHashtagPayload) {
  }
}


export class SelectHashtag implements Action {
  public readonly type = EHashtagActions.SelectHashtag;

  constructor(public payload: Hashtag) {
  }
}

export class SelectHashtagSuccess implements Action {
  public readonly type = EHashtagActions.SelectHashtagSuccess;

  constructor(public payload: Hashtag) {
  }
}

export type HashtagActions =
  | GetHashtags
  | GetHashtagsSuccess
  | CreateHashtag
  | CreateHashtagSuccess
  | UpdateHashtag
  | UpdateHashtagSuccess
  | DeleteHashtag
  | DeleteHashtagSuccess
  | SelectHashtag
  | SelectHashtagSuccess;
