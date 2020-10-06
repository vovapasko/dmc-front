import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { selectEmailsList } from '@store/selectors/email.selectors';
import { Subject } from 'rxjs';
import { LoadingService } from '@services/loading.service';
import { EmailEntity } from '@models/instances/email';
import { EmailService } from '@services/email.service';
import { Router } from '@angular/router';
import { urls } from '@constants/urls';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})

/**
 * Inbox component - handling the email inbox with sidebar and content
 */
export class InboxComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // paginated email data
  emailData: Array<EmailEntity>;
  emails$ = this.store.pipe(select(selectEmailsList));
  loading$: Subject<boolean>;


  // page number
  page = 1;
  // default page size
  pageSize = 15;
  // total number of records
  totalRecords = 0;

  // start and end index
  startIndex = 1;
  endIndex = 15;


  constructor(
    private store: Store<IAppState>,
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

  ngOnInit() {
    this.breadCrumbItems = breadCrumbs.emails;
    this.initSubscriptions();
    if (!this.emailService.selectedNewsEmail) {
      this.router.navigate([urls.EMAILS]);
    }
  }

  /**
   * Subscribe to subject
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.store.pipe(select(selectEmailsList)).subscribe(this.processEmails.bind(this));
  }

  /**
   * Handle on page click event
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize + 1;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.emailData = this.emailService.emails.slice(this.startIndex - 1, this.endIndex - 1);
  }
}
