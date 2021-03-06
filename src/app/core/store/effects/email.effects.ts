import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EmailService } from '@services/email.service';
import {
  ComposeEmail, ComposeEmailSuccess,
  CreateNewsEmail,
  CreateNewsEmailSuccess, DeleteEmail, DeleteEmailSuccess,
  EEmailActions, GetEmail,
  GetEmails,
  GetEmailsSuccess, GetEmailSuccess,
  GetNewsEmails,
  GetNewsEmailsSuccess,
  GetSent,
  GetSentSuccess,
  GetTrash,
  GetTrashSuccess,
  GmailAuth,
  GmailAuthSuccess,
  GmailCredsClear,
  GmailCredsClearSuccess,
  GmailTokenRevoke,
  GmailTokenRevokeSuccess, RemoveEmail, RemoveEmailSuccess,
  SelectEmail,
  SelectEmailSuccess,
  SelectNewsEmail,
  SelectNewsEmailSuccess,
  TrashEmail,
  TrashEmailSuccess, UntrashEmail, UntrashEmailSuccess, UpdateEmail, UpdateEmailSuccess
} from '@store/actions/email.actions';
import { GmailAuthResponse } from '@models/instances/gmail-auth-response';
import { AuthPayload } from '@models/payloads/email/auth';
import { Email, EmailEntity } from '@models/instances/email';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { GetEmailsPayload } from '@models/payloads/email/get-emails';
import { GetEmailsResponse } from '@models/responses/email/get-emails';
import { TrashPayload } from '@models/payloads/email/trash';
import { GetEmailPayload } from '@models/payloads/email/get-email';
import { GetEmailResponse } from '@models/responses/email/get-email';
import { ComposeEmailPayload } from '@models/payloads/email/compose-email';
import { DeleteEmailPayload } from '@models/payloads/project/email/delete';
import { UpdateEmailPayload } from '@models/payloads/project/email/update';

@Injectable({
  providedIn: 'root'
})
export class EmailEffects {
  @Effect()
  selectNewsEmail$ = this.actions$.pipe(
    ofType<SelectNewsEmail>(EEmailActions.SelectNewsEmail),
    switchMap((action: { payload: Email }) => this.emailService.selectNewsEmail(action.payload)),
    switchMap((response: Email) => of(new SelectNewsEmailSuccess(response)))
  );

  // @Effect()
  // selectEmail$ = this.actions$.pipe(
  //   ofType<SelectEmail>(EEmailActions.SelectEmail),
  //   switchMap((action: { payload: EmailEntity }) => this.emailService.selectEmail(action.payload)),
  //   switchMap((response: EmailEntity) => of(new SelectEmailSuccess(response)))
  // );

  @Effect()
  getNewsEmails$ = this.actions$.pipe(
    ofType<GetNewsEmails>(EEmailActions.GetNewsEmails),
    switchMap(() => this.emailService.getNewsEmails()),
    switchMap((response: Email[]) => of(new GetNewsEmailsSuccess(response)))
  );

  @Effect()
  getEmails$ = this.actions$.pipe(
    ofType<GetEmails>(EEmailActions.GetEmails),
    switchMap((action: { payload: GetEmailsPayload }) => this.emailService.getEmails(action.payload)),
    switchMap((response: GetEmailsResponse) => of(new GetEmailsSuccess(response)))
  );

  @Effect()
  updateEmail$ = this.actions$.pipe(
    ofType<UpdateEmail>(EEmailActions.UpdateEmail),
    switchMap((action: { payload: UpdateEmailPayload }) => this.emailService.updateEmail(action.payload)),
    switchMap((email: Email) => of(new UpdateEmailSuccess(email)))
  );

  @Effect()
  getEmail$ = this.actions$.pipe(
    ofType<GetEmail>(EEmailActions.GetEmail),
    switchMap((action: { payload: GetEmailPayload }) => this.emailService.getEmail(action.payload)),
    switchMap((response: EmailEntity) => of(new GetEmailSuccess(response)))
  );

  @Effect()
  composeEmail$ = this.actions$.pipe(
    ofType<ComposeEmail>(EEmailActions.ComposeEmail),
    switchMap((action: { payload: ComposeEmailPayload }) => this.emailService.composeEmail(action.payload)),
    switchMap((response: EmailEntity) => of(new ComposeEmailSuccess(response)))
  );

  @Effect()
  getTrash$ = this.actions$.pipe(
    ofType<GetTrash>(EEmailActions.GetTrash),
    switchMap((action: { payload: GetEmailsPayload }) => this.emailService.getTrash(action.payload)),
    switchMap((response: GetEmailsResponse) => of(new GetTrashSuccess(response)))
  );

  @Effect()
  getSent$ = this.actions$.pipe(
    ofType<GetSent>(EEmailActions.GetSent),
    switchMap((action: { payload: GetEmailsPayload }) => this.emailService.getSent(action.payload)),
    switchMap((response: GetEmailsResponse) => of(new GetSentSuccess(response)))
  );

  @Effect()
  trashEmail$ = this.actions$.pipe(
    ofType<TrashEmail>(EEmailActions.TrashEmail),
    switchMap((action: { payload: TrashPayload }) => this.emailService.trashEmail(action.payload)),
    switchMap((response: TrashPayload) => of(new TrashEmailSuccess(response)))
  );

  @Effect()
  untrashEmail$ = this.actions$.pipe(
    ofType<UntrashEmail>(EEmailActions.UntrashEmail),
    switchMap((action: { payload: TrashPayload }) => this.emailService.untrashEmail(action.payload)),
    switchMap((response: TrashPayload) => of(new UntrashEmailSuccess(response)))
  );

  @Effect()
  removeEmail$ = this.actions$.pipe(
    ofType<RemoveEmail>(EEmailActions.RemoveEmail),
    switchMap((action: { payload: TrashPayload }) => this.emailService.removeEmail(action.payload)),
    switchMap((response: TrashPayload) => of(new RemoveEmailSuccess(response)))
  );

  @Effect()
  createNewsEmail$ = this.actions$.pipe(
    ofType<CreateNewsEmail>(EEmailActions.CreateNewsEmail),
    switchMap((action: { payload: CreateEmailPayload }) => this.emailService.createEmail(action.payload)),
    switchMap((response: Email) => of(new CreateNewsEmailSuccess(response)))
  );

  @Effect()
  gmailAuth$ = this.actions$.pipe(
    ofType<GmailAuth>(EEmailActions.GmailAuth),
    switchMap((action: { payload: AuthPayload }) => this.emailService.gmailAuth(action.payload)),
    switchMap((response: GmailAuthResponse) => of(new GmailAuthSuccess(response)))
  );

  @Effect()
  gmailCredsClear$ = this.actions$.pipe(
    ofType<GmailCredsClear>(EEmailActions.GmailCredsClear),
    switchMap((action: { payload: AuthPayload }) => this.emailService.gmailCredsClear(action.payload)),
    switchMap((response: null) => of(new GmailCredsClearSuccess()))
  );

  @Effect()
  gmailTokenRevoke$ = this.actions$.pipe(
    ofType<GmailTokenRevoke>(EEmailActions.GmailTokenRevoke),
    switchMap((action: { payload: AuthPayload }) => this.emailService.gmailTokenRevoke(action.payload)),
    switchMap((payload: AuthPayload) => of(new GmailTokenRevokeSuccess(payload)))
  );

  @Effect()
  deleteEmail$ = this.actions$.pipe(
    ofType<DeleteEmail>(EEmailActions.DeleteEmail),
    switchMap((action: { payload: DeleteEmailPayload }) => this.emailService.deleteEmail(action.payload)),
    switchMap((payload: DeleteEmailPayload) => of(new DeleteEmailSuccess(payload)))
  );

  constructor(
    private emailService: EmailService,
    private actions$: Actions
  ) {
  }
}
