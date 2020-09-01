import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';

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

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.emails;

  }

}
