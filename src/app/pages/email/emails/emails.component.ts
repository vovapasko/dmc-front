import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { GetNewsEmails, GmailAuth, GmailCredsClear, GmailTokenRevoke } from '@store/actions/email.actions';
import { selectAuthenticationUrl, selectNewsEmails } from '@store/selectors/email.selectors';
import { breadCrumbs } from '@constants/bread-crumbs';
import { Email } from '@models/instances/email';

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

  constructor(
    private modalService: NgbModal,
    private store: Store<IAppState>
  ) {
  }

  ngOnInit() {
    this.breadCrumbItems = breadCrumbs.emails;
    this._fetchData();
  }

  public processAuthenticationUrl(authenticationUrl: string): void {
    if (!authenticationUrl) {
      return;
    }
    window.location.href = authenticationUrl;
    console.log(authenticationUrl);
  }

  public gmailAuth(email: Email): void {
    const payload = { data: { email: email.email } };
    this.store.pipe(select(selectAuthenticationUrl)).subscribe(this.processAuthenticationUrl.bind(this));
    this.store.dispatch(new GmailAuth(payload));
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
