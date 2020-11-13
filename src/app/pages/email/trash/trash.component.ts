import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { selectTrashList } from '@store/selectors/email.selectors';
import { LoadingService } from '@services/loading.service';
import { EmailEntity } from '@models/instances/email';
import { EmailService } from '@services/email.service';
import { Router } from '@angular/router';
import { urls } from '@constants/urls';
import { GetEmail, GetSent, GetTrash, RemoveEmail, TrashEmail, UntrashEmail } from '@store/actions/email.actions';
import numbers from '@constants/numbers';
import { selectLoading } from '@store/selectors/loading.selectors';
import { BehaviorSubject, Observable } from 'rxjs';
import { emailMatches, TicketService } from '@services/ticket.service';
import { messageType } from '@models/payloads/email/get-email';
import { EmailLabels } from '@models/payloads/email/get-emails';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})

/**
 * Inbox component - handling the email inbox with sidebar and content
 */
export class TrashComponent implements OnInit {
// bread crumb items
  breadCrumbItems: Array<{}>;

  // paginated email data
  emailData: Array<EmailEntity>;
  tickets$: Observable<EmailEntity[]>;
  trash$ = this.store.pipe(select(selectTrashList));
  loading$ = this.store.select(selectLoading);
  loading = false;
  checkedEmails$: BehaviorSubject<Array<EmailEntity>> = new BehaviorSubject([]);

  // page number
  page = 1;
  // default page size
  pageSize = 15;
  // total number of records
  totalRecords = 0;

  // start and end index
  startIndex = 1;
  endIndex = 15;
  term = null;


  constructor(
    private store: Store<IAppState>,
    public service: TicketService,
    private loadingService: LoadingService,
    private emailService: EmailService,
    private router: Router
  ) {
  }

  public processEmails(emails: EmailEntity[]): void {
    if (!emails) {
      return;
    }
    this.emailData = emails;
    this.totalRecords = emails.length;
  }

  /**
   * Mark as checked all contractors in table
   */
  public checkAll(): void {
    this.emailService.checkAll();
  }

  public untrash(): void {
    // tslint:disable-next-line:max-line-length
    const payload = {
      data: {
        email: this.emailService.selectedNewsEmail.email,
        messageIds: this.emailService.checkedEmails.map((email: EmailEntity) => email.id)
      }
    };
    this.store.dispatch(new UntrashEmail(payload));
  }

  public remove(): void {
    // tslint:disable-next-line:max-line-length
    const payload = {
      data: {
        email: this.emailService.selectedNewsEmail.email,
        messageIds: this.emailService.checkedEmails.map((email: EmailEntity) => email.id)
      }
    };
    this.store.dispatch(new RemoveEmail(payload));
  }

  public readEmail(email: EmailEntity): void {
    const pagination = numbers.pageSize;
    const payload = { messageId: email.id, email: this.emailService.selectedNewsEmail.email, messageType: messageType.full, pagination };
    this.store.dispatch(new GetEmail(payload));
  }

  /**
   * Mark as checked contractor in table
   */
  public check(email: EmailEntity): void {
    this.emailService.check(email);
  }

  ngOnInit() {
    this.checkedEmails$ = this.emailService.checkedEmails$;
    this.emailService.checkedEmails = [];
    this.service.matches = emailMatches;
    this.service.searchTerm = '';
    this.service.records$ = this.emailService.trash$;
    // @ts-ignore
    this.tickets$ = this.service.tickets$;
    this.breadCrumbItems = breadCrumbs.emails.trash;
    this.store.select(selectLoading).subscribe(this.processLoading.bind(this));
    this.initSubscriptions();
    if (!this.emailService.selectedNewsEmail) {
      this.router.navigate([urls.EMAILS]);
    }
    this.fetchData();
  }

  public reload(): void {
    const payload = { email: this.emailService.selectedNewsEmail.email, pagination: numbers.pageSize, labels: EmailLabels.sent };
    this.store.dispatch(new GetTrash(payload));
  }

  public processLoading(value: boolean): void {
    this.loading = value;
  }

  /**
   * Subscribe to subject
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.store.pipe(select(selectTrashList)).subscribe(this.processEmails.bind(this));
  }

  public next(): void {
    const email = this.emailService.selectedNewsEmail.email;
    const nextPageToken = this.emailService.nextPageToken;
    const pagination = numbers.pageSize;
    this.store.dispatch(new GetTrash({ email, nextPageToken, pagination, labels: EmailLabels.sent }));
  }

  public search(value: string | null) {
    this.service.searchTerm = value;
    this.term = value;
  }

  public previous(): void {
    const email = this.emailService.selectedNewsEmail.email;
    const previousPageToken = this.emailService.previousPageToken;
    const pagination = numbers.pageSize;
    this.store.dispatch(new GetTrash({ email, nextPageToken: previousPageToken, pagination, labels: EmailLabels.sent }));
  }

  public fetchData(): void {
    const email = this.emailService.selectedNewsEmail.email;
    const pagination = numbers.pageSize;
    this.store.dispatch(new GetTrash({ email, pagination, labels: EmailLabels.trash }));
  }
}
