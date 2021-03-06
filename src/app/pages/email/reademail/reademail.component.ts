import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';
import { select, Store } from '@ngrx/store';
import { selectEmail } from '@store/selectors/email.selectors';
import { IAppState } from '@store/state/app.state';
import { selectLoading } from '@store/selectors/loading.selectors';
import { urls } from '@constants/urls';
import { EmailService } from '@services/email.service';
import { Router } from '@angular/router';
import { base64ToArrayBuffer, bytesToSize, saveFile, urltoFile } from '@helpers/utility';
import { Attachment } from '@models/instances/attachment';
import { encode, decode, toUint8Array } from 'js-base64';

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
  loading = false;
  bytesToSize = bytesToSize;

  constructor(
    private store: Store<IAppState>,
    private emailService: EmailService,
    private router: Router
  ) {
    this.store.select(selectLoading).subscribe(this.processLoading.bind(this));
    if (!this.emailService.selectedNewsEmail) {
      this.router.navigate([urls.EMAILS]);
    }
  }

  public downloadAttachment(attachment: Attachment): void {
    const payload = {
      attachmentId: attachment.attachmentId,
      messageId: this.emailService.selectedEmail.id,
      email: this.emailService.selectedNewsEmail.email
    };
    this.emailService.getAttachment(payload).subscribe(
      (response: Attachment) => {
        const url = URL.createObjectURL(new Blob([toUint8Array(response.data)] , {type: attachment.type}));
        urltoFile(url, attachment.name, attachment.type).then(file => {
          saveFile(file, attachment.name);
        });
      }
    );
  }

  public processLoading(value: boolean): void {
    this.loading = value;
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.emails.read;

  }

}
