import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestHandler } from '@helpers/request-handler';
import { FormBuilder } from '@angular/forms';
import { BaseService } from '@services/base.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { Email, EmailEntity } from '@models/instances/email';
import { GmailAuthResponse } from '@models/instances/gmail-auth-response';
import { AuthPayload } from '@models/payloads/email/auth';

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
  selectedEmail$: BehaviorSubject<EmailEntity> = new BehaviorSubject(null);


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

  get selectedEmail() {
    return this.selectedEmail$.getValue();
  }

  set selectedEmail(value: EmailEntity) {
    this.selectedEmail$.next(value);
  }

  /**
   *  Get news emails
   */
  public getNewsEmails(): Observable<Array<Email>> {
    return this.requestHandler.request(
      this.url(api, endpoints.EMAILS),
      methods.GET,
      null,
      (response: {results: Array<Email>}) => {
        this.newsEmails = [...this.newsEmails, ...response.results];
        return response.results;
      }
    );
  }

  /**
   *  Get emails
   */
  public getEmails(): Observable<Array<EmailEntity>> {
    return this.requestHandler.request(
      this.url(api, endpoints.MAILS),
      methods.POST,
      null,
      (response: Array<EmailEntity>) => {
        this.emails = [...this.emails, ...response];
        return response;
      }
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
        return response;
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
        return response;
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

}
