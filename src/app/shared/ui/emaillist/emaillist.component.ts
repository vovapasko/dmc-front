import { Component, OnInit } from '@angular/core';
import { EmailService } from '@services/email.service';
import { select, Store } from '@ngrx/store';
import { selectEmailsList, selectLabels } from '@store/selectors/email.selectors';
import { IAppState } from '@store/state/app.state';
import { emailList } from '@shared/ui/emaillist/data';
import { EmailEntity } from '@models/instances/email';

@Component({
  selector: 'app-emaillist',
  templateUrl: './emaillist.component.html',
  styleUrls: ['./emaillist.component.scss']
})
export class EmaillistComponent implements OnInit {
  // Email left sidebar data
  emailList = [];
  labels$ = this.store.pipe(select(selectLabels));
  emails$ = this.store.pipe(select(selectEmailsList));

  public processEmails(emails: EmailEntity[]): void {
    if (!emails) {
      return;
    }
  }

  constructor(
    private emailService: EmailService,
    private store: Store<IAppState>
  ) {
  }

  ngOnInit() {
    this.emailList = emailList;
  }
}
