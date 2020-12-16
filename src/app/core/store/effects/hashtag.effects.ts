import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HashtagService } from '@services/hashtag.service';
import {
  CreateHashtag,
  CreateHashtagSuccess, DeleteHashtag, DeleteHashtagSuccess,
  EHashtagActions,
  GetHashtags,
  GetHashtagsSuccess, SelectHashtag, SelectHashtagSuccess,
  UpdateHashtag, UpdateHashtagSuccess
} from '@store/actions/hashtag.actions';
import { Hashtag } from '@models/instances/hashtag';
import { CreateHashtagPayload } from '@models/payloads/news/hashtag/create';
import { UpdateHashtagPayload } from '@models/payloads/news/hashtag/update';
import { DeleteHashtagPayload } from '@models/payloads/news/hashtag/delete';
import { GetHashtagsPayload } from '@models/payloads/news/hashtag/get';

@Injectable({
  providedIn: 'root'
})
export class HashtagEffects {
  @Effect()
  getHashtags$ = this.actions$.pipe(
    ofType<GetHashtags>(EHashtagActions.GetHashtags),
    switchMap((action: { payload: GetHashtagsPayload }) => this.hashtagService.getAll(action.payload)),
    switchMap((hashtags: Hashtag[]) => of(new GetHashtagsSuccess(hashtags)))
  );

  @Effect()
  createHashtag$ = this.actions$.pipe(
    ofType<CreateHashtag>(EHashtagActions.CreateHashtag),
    switchMap((action: { payload: CreateHashtagPayload }) => this.hashtagService.create(action.payload)),
    switchMap((hashtag: Hashtag) => of(new CreateHashtagSuccess(hashtag)))
  );

  @Effect()
  updateHashtag$ = this.actions$.pipe(
    ofType<UpdateHashtag>(EHashtagActions.UpdateHashtag),
    switchMap((action: { payload: UpdateHashtagPayload }) => this.hashtagService.update(action.payload)),
    switchMap((hashtag: Hashtag) => of(new UpdateHashtagSuccess(hashtag)))
  );

  @Effect()
  deleteHashtag$ = this.actions$.pipe(
    ofType<DeleteHashtag>(EHashtagActions.DeleteHashtag),
    switchMap((action: { payload: DeleteHashtagPayload }) => this.hashtagService.delete(action.payload)),
    switchMap((payload: DeleteHashtagPayload) => of(new DeleteHashtagSuccess(payload)))
  );

  @Effect()
  selectHashtag$ = this.actions$.pipe(
    ofType<SelectHashtag>(EHashtagActions.SelectHashtag),
    switchMap((action: { payload: Hashtag }) => this.hashtagService.selectHashtag(action.payload)),
    switchMap((payload: Hashtag) => of(new SelectHashtagSuccess(payload)))
  );

  constructor(
    private hashtagService: HashtagService,
    private actions$: Actions
  ) {
  }
}
