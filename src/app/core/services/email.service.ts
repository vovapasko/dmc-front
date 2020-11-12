import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestHandler } from '@helpers/request-handler';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BaseService } from '@services/base.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { Email, EmailEntity } from '@models/instances/email';
import { GmailAuthResponse } from '@models/instances/gmail-auth-response';
import { AuthPayload } from '@models/payloads/email/auth';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { GetEmailsPayload } from '@models/payloads/email/get-emails';
import { GetEmailsResponse } from '@models/responses/email/get-emails';
import { Label } from '@models/instances/labels';
import { TrashPayload } from '@models/payloads/email/trash';
import { emailValidator } from '@helpers/utility';
import { separators } from '@constants/separators';
import { GetEmailPayload } from '@models/payloads/email/get-email';
import { GetEmailResponse } from '@models/responses/email/get-email';

const api = environment.api;


@Injectable({
  providedIn: 'root'
})
export class EmailService extends BaseService {

  constructor(
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder
  ) {
    super();
  }

  newsEmails$: BehaviorSubject<Array<Email>> = new BehaviorSubject([]);
  emails$: BehaviorSubject<Array<EmailEntity>> = new BehaviorSubject([]);
  trash$: BehaviorSubject<Array<EmailEntity>> = new BehaviorSubject([]);
  sent$: BehaviorSubject<Array<EmailEntity>> = new BehaviorSubject([]);
  labels$: BehaviorSubject<Array<Label>> = new BehaviorSubject([]);
  selectedEmail$: BehaviorSubject<EmailEntity> = new BehaviorSubject(null);
  selectedNewsEmail$: BehaviorSubject<Email> = new BehaviorSubject(null);
  nextPageToken$: BehaviorSubject<string> = new BehaviorSubject(null);
  previousPageToken$: BehaviorSubject<string> = new BehaviorSubject(null);
  checkedEmails$: BehaviorSubject<Array<EmailEntity>> = new BehaviorSubject([]);


  get checkedEmails() {
    return this.checkedEmails$.getValue();
  }

  set checkedEmails(value: Array<EmailEntity>) {
    this.checkedEmails$.next(value);
  }

  get labels() {
    return this.labels$.getValue();
  }

  set labels(value: Array<Label>) {
    this.labels$.next(value);
  }

  get nextPageToken() {
    return this.nextPageToken$.getValue();
  }

  set nextPageToken(value: string) {
    this.nextPageToken$.next(value);
  }

  get previousPageToken() {
    return this.previousPageToken$.getValue();
  }

  set previousPageToken(value: string) {
    this.previousPageToken$.next(value);
  }

  get newsEmails() {
    return this.newsEmails$.getValue();
  }

  set newsEmails(value: Array<Email>) {
    this.newsEmails$.next(value);
  }

  get emails() {
    return this.emails$.getValue();
  }

  set emails(value: Array<EmailEntity>) {
    this.emails$.next(value);
  }

  get sent() {
    return this.sent$.getValue();
  }

  set sent(value: Array<EmailEntity>) {
    this.sent$.next(value);
  }

  get trash() {
    return this.trash$.getValue();
  }

  set trash(value: Array<EmailEntity>) {
    this.trash$.next(value);
  }

  get selectedEmail() {
    return this.selectedEmail$.getValue();
  }

  set selectedEmail(value: EmailEntity) {
    this.selectedEmail$.next(value);
  }

  get selectedNewsEmail() {
    return this.selectedNewsEmail$.getValue();
  }

  set selectedNewsEmail(value: Email) {
    this.selectedNewsEmail$.next(value);
  }

  /**
   *  Get news emails
   */
  public getNewsEmails(): Observable<Array<Email>> {
    return this.requestHandler.request(
      this.url(api, endpoints.EMAILS),
      methods.GET,
      null,
      (response: { results: Array<Email> }) => {
        this.newsEmails = [...this.newsEmails, ...response.results];
        return response.results;
      }
    );
  }

  /**
   *  Get emails
   */
  public getEmails(payload: GetEmailsPayload): Observable<GetEmailsResponse> {
    return this.requestHandler.request(
      this.url(api, endpoints.MAILS, null, payload),
      methods.GET,
      null,
      (response: GetEmailsResponse) => {
        this.emails = [...this.emails, ...response.messages];
        this.labels = [...this.labels, ...response.labels];
        this.previousPageToken = this.nextPageToken$.getValue();
        this.nextPageToken = response.nextPageToken;
        return response;
      }
    );
  }

  /**
   *  Get email
   */
  public getEmail(payload: GetEmailPayload): Observable<GetEmailResponse> {
    return this.requestHandler.request(
      this.url(api, endpoints.MAILS, payload.id, payload),
      methods.GET,
      null,
      (response: GetEmailResponse) => {
        return response.full;
      }
    );
  }

  /**
   *  Get emails
   */
  public getTrash(payload: GetEmailsPayload): Observable<GetEmailsResponse> {
    return this.requestHandler.request(
      this.url(api, endpoints.TRASH, null, payload),
      methods.GET,
      null,
      (response: GetEmailsResponse) => {
        this.trash = [...this.trash, ...response.messages];
        this.previousPageToken = this.nextPageToken$.getValue();
        this.nextPageToken = response.nextPageToken;
        return response;
      }
    );
  }

  /**
   *  Get emails
   */
  public getSent(payload: GetEmailsPayload): Observable<GetEmailsResponse> {
    return this.requestHandler.request(
      this.url(api, endpoints.SENT, null, payload),
      methods.GET,
      null,
      (response: GetEmailsResponse) => {
        this.sent = [...this.sent, ...response.messages];
        this.previousPageToken = this.nextPageToken$.getValue();
        this.nextPageToken = response.nextPageToken;
        return response;
      }
    );
  }

  public trashEmail(payload: TrashPayload): Observable<TrashPayload> {
    return this.requestHandler.request(
      this.url(api, endpoints.TRASH),
      methods.POST,
      payload,
      (response: null) => {
        return payload;
      }
    );
  }

  /**
   *  Returns form group for email form
   */
  public initializeComposeEmailForm(): FormGroup {
    return this.formBuilder.group({
      receiver: [null, [Validators.required]],
      copy: [null, [emailValidator()]],
      subject: [null, [Validators.required]],
      content: [null, [Validators.required]],
      attachments: [null, []]
    });
  }

  public untrashEmail(payload: TrashPayload): Observable<TrashPayload> {
    return this.requestHandler.request(
      this.url(api, endpoints.UNTRASH),
      methods.POST,
      payload,
      (response: null) => {
        return payload;
      }
    );
  }

  public removeEmail(payload: TrashPayload): Observable<TrashPayload> {
    return this.requestHandler.request(
      this.url(api, endpoints.REMOVE),
      methods.POST,
      payload,
      (response: null) => {
        return payload;
      }
    );
  }

  /**
   * Create email
   */
  public createEmail(payload: CreateEmailPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.EMAILS),
      methods.POST,
      payload,
      (response: Email) => response
    );
  }

  /**
   *  Auth gmail
   */
  public gmailAuth(payload: AuthPayload): Observable<GmailAuthResponse> {
    return this.requestHandler.request(
      this.url(api, endpoints.GMAIL_AUTH),
      methods.POST,
      payload,
      (response: GmailAuthResponse) => {
        return { ...response, ...payload.data };
      }
    );
  }

  /**
   *  Clear gmail creds
   */
  public gmailCredsClear(payload: AuthPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.GMAIL_CREDS_CLEAR),
      methods.DELETE,
      payload,
      (response: null) => {
        return response;
      }
    );
  }

  /**
   *  Revoke token
   */
  public gmailTokenRevoke(payload: AuthPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.GMAIL_TOKEN_REVOKE),
      methods.POST,
      payload,
      (response: null) => {
        return payload;
      }
    );
  }

  /**
   *  Select email for read
   *  returns observable
   */
  public selectEmail(emailEntity: EmailEntity): Observable<EmailEntity> {
    this.selectedEmail = emailEntity;
    return of(emailEntity);
  }

  /**
   * Mark as checked all emails
   */
  public checkAll(): void {
    const emails = this.emails;
    const checkedEmails = this.checkedEmails;
    const checkedAll = checkedEmails.length === emails.length;
    if (checkedAll) {
      this.checkedEmails = [];
    } else {
      this.checkedEmails = emails;
    }
  }

  /**
   * Mark contractor as check
   */
  public check(email: EmailEntity): void {
    const checkedEmails = this.checkedEmails;
    const checked = checkedEmails.indexOf(email) !== -1;
    if (checked) {
      this.checkedEmails = checkedEmails
        .filter(
          (filterEmail: EmailEntity) => filterEmail.id !== email.id
        );
    } else {
      this.checkedEmails = [...checkedEmails, email];
    }
  }

  /**
   *  Select email for read
   *  returns observable
   */
  public selectNewsEmail(email: Email): Observable<Email> {
    this.selectedNewsEmail = email;
    return of(email);
  }

}
