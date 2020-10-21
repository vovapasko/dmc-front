import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';
import { EmailService } from '@services/email.service';
import { urls } from '@constants/urls';
import { Router } from '@angular/router';

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

  constructor(
    private emailService: EmailService,
    private router: Router
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.emails.compose;
    if (!this.emailService.selectedNewsEmail) {
      this.router.navigate([urls.EMAILS]);
    }
  }

}
