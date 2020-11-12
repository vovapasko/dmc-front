import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';
import { select, Store } from '@ngrx/store';
import { selectEmail } from '@store/selectors/email.selectors';
import { IAppState } from '@store/state/app.state';

@Component({
  selector: 'app-reademail',
  templateUrl: './reademail.component.html',
  styleUrls: ['./reademail.component.scss']
})
/**
 * Inbox component - handling the email inbox with sidebar and content
 */
export class ReademailComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  email$ = this.store.pipe(select(selectEmail));

  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.emails.read;

  }

}
