import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';

@Component({
  selector: 'app-composeemail',
  templateUrl: './composeemail.component.html',
  styleUrls: ['./composeemail.component.scss']
})

/**
 * Email compose component - handling the email compose with sidebar and content
 */
export class ComposeemailComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.emails;

  }

}
