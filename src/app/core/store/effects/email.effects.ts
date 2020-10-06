import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EmailService } from '@services/email.service';
import {
  CreateNewsEmail, CreateNewsEmailSuccess,
  EEmailActions, GetEmails, GetEmailsSuccess, GetNewsEmails, GetNewsEmailsSuccess,
  GmailAuth,
  GmailAuthSuccess,
  GmailCredsClear,
  GmailCredsClearSuccess,
  GmailTokenRevoke, GmailTokenRevokeSuccess
} from '@store/actions/email.actions';
import { GmailAuthResponse } from '@models/instances/gmail-auth-response';
import { AuthPayload } from '@models/payloads/email/auth';
import { Email, EmailEntity } from '@models/instances/email';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { GetEmailsPayload } from '@models/payloads/email/get-emails';

@Injectable({
  providedIn: 'root'
})
export class EmailEffects {
  @Effect()
  getNewsEmails$ = this.actions$.pipe(
    ofType<GetNewsEmails>(EEmailActions.GetNewsEmails),
    switchMap(() => this.emailService.getNewsEmails()),
    switchMap((response: Email[]) => of(new GetNewsEmailsSuccess(response)))
  );

  @Effect()
  getEmails$ = this.actions$.pipe(
    ofType<GetEmails>(EEmailActions.GetEmails),
    switchMap((action: {payload: GetEmailsPayload}) => this.emailService.getEmails(action.payload)),
    switchMap((response: EmailEntity[]) => of(new GetEmailsSuccess(response)))
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


  constructor(
    private emailService: EmailService,
    private actions$: Actions
  ) {
  }
}
