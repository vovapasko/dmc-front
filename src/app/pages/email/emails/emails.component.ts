import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import {
  CreateNewsEmail,
  DeleteEmail,
  GetNewsEmails,
  GmailAuth,
  GmailTokenRevoke,
  SelectNewsEmail, UpdateEmail
} from '@store/actions/email.actions';
import { selectAuthenticationUrl, selectNewsEmails, selectSelectedNewsEmail } from '@store/selectors/email.selectors';
import { breadCrumbs } from '@constants/bread-crumbs';
import { Email } from '@models/instances/email';
import { getMailImageIcon } from '@constants/images';
import { urls } from '@constants/urls';
import { Router } from '@angular/router';
import numbers from '@constants/numbers';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@services/project.service';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { CreateHashtagPayload } from '@models/payloads/news/hashtag/create';
import { CreatePostsFormatPayload } from '@models/payloads/news/format/create';
import { Subject } from 'rxjs';
import { ServerError } from '@models/responses/server/error';
import { LoadingService } from '@services/loading.service';
import { ErrorService } from '@services/error.service';
import { UpdateEmailPayload } from '@models/payloads/project/email/update';
import { EmailService } from '@services/email.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})

/**
 * Opportunities component - handling the emails with sidebar and content
 */
export class EmailsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  submitted: boolean;
  newsEmails$ = this.store.pipe(select(selectNewsEmails));
  createEmailForm: FormGroup;
  editEmailForm: FormGroup;
  visible: boolean;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  showPasswordEmails = [];
  newsEmailId: number;

  constructor(
    private modalService: NgbModal,
    private store: Store<IAppState>,
    private router: Router,
    private projectService: ProjectService,
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private emailService: EmailService
  ) {
  }

  ngOnInit() {
    this.breadCrumbItems = breadCrumbs.emails.email;
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
    this._fetchData();
    this.initCreateEmailForm();
    this.initEditEmailForm();
  }

  public showPassword(email: Email): void {
    if (this.showPasswordEmails.indexOf(email) === -1) {
      this.showPasswordEmails.push(email);
    }
  }

  public hidePassword(email: Email): void {
    if (this.showPasswordEmails.indexOf(email) !== -1) {
      this.showPasswordEmails = this.showPasswordEmails.filter(emailElement => emailElement.id !== email.id);
    }
  }

  public initCreateEmailForm(): void {
    this.createEmailForm = this.projectService.initializeCreateEmailForm();
  }

  public initEditEmailForm(): void {
    this.editEmailForm = this.projectService.initializeEditEmailForm();
  }

  public submitCreateEmailForm(): void {
    const data = this.createEmailForm.value;
    const payload = { data } as unknown as CreateEmailPayload;
    this.submit(this.createEmailForm, this.createEmail.bind(this), payload);
  }

  public submitEditEmailForm(): void {
    const data = this.editEmailForm.value;
    const payload = { id: this.emailService.selectedNewsEmail.id, data } as unknown as UpdateEmailPayload;
    this.submit(this.editEmailForm, this.editEmail.bind(this), payload);
  }

  public editEmail(payload: UpdateEmailPayload): void {
    this.store.dispatch(new UpdateEmail(payload));
  }

  public createEmail(payload: CreateEmailPayload): void {
    this.store.dispatch(new CreateNewsEmail(payload));
  }

  public submit(form: FormGroup, handler, payload: CreateHashtagPayload | CreatePostsFormatPayload | CreateEmailPayload | UpdateEmailPayload): void {
    this.submitted = true;

    if (form && form.invalid) {
      return;
    }

    handler(payload);
    this.submitted = false;
    form.reset();
    this.modalService.dismissAll();
    this.submitted = false;
  }

  // convenience getter for easy access to form fields
  get createEmailControls(): { [p: string]: AbstractControl } {
    return this.createEmailForm.controls;
  }

  get editEmailControls() {
    return this.editEmailForm.controls;
  }


  public processAuthenticationUrl(authenticationUrl: string): void {
    if (!authenticationUrl) {
      return;
    }
    const win = window.open(authenticationUrl, '_blank');
    win.focus();
  }

  public getMailImage(email: Email): string {
    return getMailImageIcon(email);
  }

  public gmailAuth(email: Email): void {
    const payload = { data: { email: email.email } };
    this.store.pipe(select(selectAuthenticationUrl)).subscribe(this.processAuthenticationUrl.bind(this));
    this.store.dispatch(new GmailAuth(payload));
  }

  public editNewsEmail(email: Email): void {
    this.editEmailForm = this.projectService.initializeEditEmailForm(email);
    this.store.dispatch(new SelectNewsEmail(email));
  }

  public deleteEmail(email: Email): void {
    const payload = { id: email.id, data: { isArchived: true } };
    this.store.dispatch(new DeleteEmail(payload));
  }

  public openInbox(email: Email): void {
    const payload = { email: email.email, pagination: numbers.pageSize };
    // this.store.dispatch(new GetEmails(payload));
    this.store.dispatch(new SelectNewsEmail(email));
    this.router.navigate([urls.INBOX]);
  }

  public gmailTokenRevoke(email: Email): void {
    const payload = { data: { email: email.email } };
    this.store.dispatch(new GmailTokenRevoke(payload));
  }

  /**
   * Modal Open
   * @param content modal content
   */
  openModal(content: string) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * save the Opportunities data
   */
  saveData() {
    this.submitted = true;
  }

  /**
   * fetches the emails value
   */
  private _fetchData() {
    this.store.dispatch(new GetNewsEmails());
  }
}
