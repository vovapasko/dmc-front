import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { PublicationService } from '@services/publication.service';
import {
  CreateComment,
  CreateCommentSuccess,
  CreateNotPublication,
  CreateNotPublicationSuccess,
  CreatePublication,
  CreatePublicationSuccess, DeleteComment, DeleteCommentSuccess,
  DeleteNotPublication,
  DeleteNotPublicationSuccess,
  DeletePublication,
  DeletePublicationSuccess,
  EPublicationActions,
  GetComments,
  GetCommentsSuccess,
  GetPublicationBlackList,
  GetPublicationBlackListSuccess,
  GetPublications,
  GetPublicationsSuccess,
  UpdateComment,
  UpdateCommentSuccess,
  UpdateNotPublication,
  UpdateNotPublicationSuccess,
  UpdatePublication,
  UpdatePublicationSuccess
} from '@store/actions/publication.action';
import { Publication } from '@models/instances/publication';
import { CreatePublishPayload } from '@models/payloads/publication/publish/create';
import { UpdatePublishPayload } from '@models/payloads/publication/publish/update';
import { DeletePublishPayload } from '@models/payloads/publication/publish/delete';
import { PublicationBlackList } from '@models/instances/publication-black-list';
import { CreateNotPublishPayload } from '@models/payloads/publication/notPublish/create';
import { UpdateNotPublishPayload } from '@models/payloads/publication/notPublish/update';
import { DeleteNotPublishPayload } from '@models/payloads/publication/notPublish/delete';
import { CreateCommentPayload } from '@models/payloads/publication/comment/create';
import { UpdateCommentPayload } from '@models/payloads/publication/comment/update';
import { DeleteCommentPayload } from '@models/payloads/publication/comment/delete';
import { Comment } from '@models/instances/comment';

@Injectable({
  providedIn: 'root'
})
export class ProjectEffects {
  @Effect()
  getPublications$ = this.actions$.pipe(
    ofType<GetPublications>(EPublicationActions.GetPublications),
    switchMap((action) => this.publicationService.getPublications()),
    switchMap((publications: Publication[]) => of(new GetPublicationsSuccess(publications)))
  );

  @Effect()
  createPublication$ = this.actions$.pipe(
    ofType<CreatePublication>(EPublicationActions.CreatePublication),
    switchMap((action: { payload: CreatePublishPayload }) => this.publicationService.createPublication(action.payload)),
    switchMap((publication: Publication) => of(new CreatePublicationSuccess(publication)))
  );

  @Effect()
  updatePublication$ = this.actions$.pipe(
    ofType<UpdatePublication>(EPublicationActions.UpdatePublication),
    switchMap((action: { payload: UpdatePublishPayload }) => this.publicationService.updatePublication(action.payload)),
    switchMap((publication: Publication) => of(new UpdatePublicationSuccess(publication)))
  );

  @Effect()
  deletePublication$ = this.actions$.pipe(
    ofType<DeletePublication>(EPublicationActions.DeletePublication),
    switchMap((action: { payload: DeletePublishPayload }) => this.publicationService.deletePublication(action.payload)),
    switchMap((payload: DeletePublishPayload) => of(new DeletePublicationSuccess(payload)))
  );

  @Effect()
  getPublicationBlackList$ = this.actions$.pipe(
    ofType<GetPublicationBlackList>(EPublicationActions.GetPublicationBlackList),
    switchMap((action) => this.publicationService.getPublicationsBlackList()),
    switchMap((publications: PublicationBlackList[]) => of(new GetPublicationBlackListSuccess(publications)))
  );

  @Effect()
  createNotPublication = this.actions$.pipe(
    ofType<CreateNotPublication>(EPublicationActions.CreateNotPublication),
    switchMap((action: { payload: CreateNotPublishPayload }) => this.publicationService.createPublicationBlackList(action.payload)),
    switchMap((publication: PublicationBlackList) => of(new CreateNotPublicationSuccess(publication)))
  );

  @Effect()
  updateNotPublication$ = this.actions$.pipe(
    ofType<UpdateNotPublication>(EPublicationActions.UpdateNotPublicationSuccess),
    switchMap((action: { payload: UpdateNotPublishPayload }) => this.publicationService.updatePublicationBlackList(action.payload)),
    switchMap((publication: PublicationBlackList) => of(new UpdateNotPublicationSuccess(publication)))
  );

  @Effect()
  deleteNotPublication$ = this.actions$.pipe(
    ofType<DeleteNotPublication>(EPublicationActions.DeleteNotPublication),
    switchMap((action: { payload: DeleteNotPublishPayload }) => this.publicationService.deletePublicationBlackList(action.payload)),
    switchMap((payload: DeleteNotPublishPayload) => of(new DeleteNotPublicationSuccess(payload)))
  );

  @Effect()
  getComments$ = this.actions$.pipe(
    ofType<GetComments>(EPublicationActions.GetComments),
    switchMap((action) => this.publicationService.getComments()),
    switchMap((comments: Comment[]) => of(new GetCommentsSuccess(comments)))
  );

  @Effect()
  createComment$ = this.actions$.pipe(
    ofType<CreateComment>(EPublicationActions.CreateComment),
    switchMap((action: { payload: CreateCommentPayload }) => this.publicationService.createComment(action.payload)),
    switchMap((comment: Comment) => of(new CreateCommentSuccess(comment)))
  );

  @Effect()
  updateComment$ = this.actions$.pipe(
    ofType<UpdateComment>(EPublicationActions.UpdateComment),
    switchMap((action: { payload: UpdateCommentPayload }) => this.publicationService.updateComment(action.payload)),
    switchMap((comment: Comment) => of(new UpdateCommentSuccess(comment)))
  );

  @Effect()
  deleteComment = this.actions$.pipe(
    ofType<DeleteComment>(EPublicationActions.DeleteComment),
    switchMap((action: { payload: DeleteCommentPayload }) => this.publicationService.deleteComment(action.payload)),
    switchMap((payload: DeleteCommentPayload) => of(new DeleteCommentSuccess(payload)))
  );


  constructor(private publicationService: PublicationService, private actions$: Actions) {
  }
}
