import { Component, OnInit } from '@angular/core';
import { EmailService } from '@services/email.service';
import { select, Store } from '@ngrx/store';
import { selectEmailsList, selectLabels } from '@store/selectors/email.selectors';
import { IAppState } from '@store/state/app.state';

@Component({
  selector: 'app-emaillist',
  templateUrl: './emaillist.component.html',
  styleUrls: ['./emaillist.component.scss']
})
export class EmaillistComponent implements OnInit {
  // Email left sidebar data
  labels$ = this.store.pipe(select(selectLabels));
  emails$ = this.store.pipe(select(selectEmailsList));

  constructor(
    private emailService: EmailService,
    private store: Store<IAppState>
  ) {
  }

  ngOnInit() {
  }
}
