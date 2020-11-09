import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { selectEmailsList, selectSentList } from '@store/selectors/email.selectors';
import { LoadingService } from '@services/loading.service';
import { EmailEntity } from '@models/instances/email';
import { EmailService } from '@services/email.service';
import { Router } from '@angular/router';
import { urls } from '@constants/urls';
import { GetEmails, GetSent, TrashEmail } from '@store/actions/email.actions';
import numbers from '@constants/numbers';
import { selectLoading } from '@store/selectors/loading.selectors';
import { BehaviorSubject, Observable } from 'rxjs';
import { emailMatches, TicketService } from '@services/ticket.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})

/**
 * Inbox component - handling the email inbox with sidebar and content
 */
export class SentComponent implements OnInit {
// bread crumb items
  breadCrumbItems: Array<{}>;
  checkedEmails$: BehaviorSubject<Array<EmailEntity>> = new BehaviorSubject([]);

  // paginated email data
  emailData: Array<EmailEntity>;
  tickets$: Observable<EmailEntity[]>;
  sent$ = this.store.pipe(select(selectEmailsList));
  loading$ = this.store.select(selectLoading);
  loading = false;

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

  /**
   * Mark as checked contractor in table
   */
  public check(email: EmailEntity): void {
    this.emailService.check(email);
  }

  ngOnInit() {
    this.service.matches = emailMatches;
    this.emailService.checkedEmails = [];
    this.checkedEmails$ = this.emailService.checkedEmails$;
    this.service.searchTerm = '';
    this.service.records$ = this.emailService.sent$;
    this.tickets$ = this.service.tickets$;
    this.breadCrumbItems = breadCrumbs.emails.sent;
    this.store.select(selectLoading).subscribe(this.processLoading.bind(this));
    this.initSubscriptions();
    if (!this.emailService.selectedNewsEmail) {
      this.router.navigate([urls.EMAILS]);
    }
  }

  public trash(): void {
    const payload = { data: { ids: this.emailService.checkedEmails.map((email: EmailEntity) => email.id) } };
    this.store.dispatch(new TrashEmail(payload));
  }

  public reload(): void {
    const payload = { email: this.emailService.selectedNewsEmail.email, pagination: numbers.pageSize };
    this.store.dispatch(new GetSent(payload));
  }

  public processLoading(value: boolean): void {
    this.loading = value;
  }

  /**
   * Subscribe to subject
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.store.pipe(select(selectSentList)).subscribe(this.processEmails.bind(this));
  }

  public next(): void {
    const email = this.emailService.selectedNewsEmail.email;
    const nextPageToken = this.emailService.nextPageToken;
    const pagination = numbers.pageSize;
    this.store.dispatch(new GetSent({ email, nextPageToken, pagination }));
  }

  public search(value: string | null) {
    this.service.searchTerm = value;
    this.term = value;
  }

  public previous(): void {
    const email = this.emailService.selectedNewsEmail.email;
    const previousPageToken = this.emailService.previousPageToken;
    const pagination = numbers.pageSize;
    this.store.dispatch(new GetSent({ email, nextPageToken: previousPageToken, pagination }));
  }
}
