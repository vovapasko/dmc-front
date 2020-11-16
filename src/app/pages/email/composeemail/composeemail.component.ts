import { Component, OnInit } from '@angular/core';
import { breadCrumbs } from '@constants/bread-crumbs';
import { EmailService } from '@services/email.service';
import { urls } from '@constants/urls';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Infos } from '@constants/notifications';
import { separators } from '@constants/separators';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Attachment } from '@models/instances/attachment';
import { urltoFile, bytesToSize, saveFile } from '@helpers/utility';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { ComposeEmail } from '@store/actions/email.actions';

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
  composeEmailForm: FormGroup;
  submitted = false;
  bytesToSize = bytesToSize;
  imageTypes = [''];

  constructor(
    private emailService: EmailService,
    private router: Router,
    private store: Store<IAppState>
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.emails.compose;
    if (!this.emailService.selectedNewsEmail) {
      this.router.navigate([urls.EMAILS]);
    }
    this.initComposeEmailForm();
  }

  public initComposeEmailForm(): void {
    this.composeEmailForm = this.emailService.initializeComposeEmailForm();
  }

  // convenience getter for easy access to form fields
  get composeEmailFormControls(): { [p: string]: AbstractControl } {
    return this.composeEmailForm.controls;
  }

  public downloadAttachment(attachment: Attachment): void {
    urltoFile(attachment.base64, attachment.name, attachment.type)
      .then(file => {
        saveFile(file, attachment.name);
      });
  }

  /**
   * Upload new image to cropper
   */
  public onFileChanges(files) {
    if (files && files.length) {
      this.composeEmailFormControls.attachments.setValue(files);
    }
  }

  public onSubmit(): void {
    this.submitted = true;
    const composeEmailForm = this.composeEmailForm;
    console.log(composeEmailForm);
    if (composeEmailForm.invalid) {
      return;
    }
    // tslint:disable-next-line:max-line-length
    const copy = this.composeEmailFormControls.copy.value ? this.composeEmailFormControls.copy.value.split(separators.whitespace).join(',') : null;
    const { receiver, subject, content, attachments } = this.composeEmailForm.value;
    const data = { email: this.emailService.selectedNewsEmail.email, emailTo: receiver, subject, text: content, attachments };
    if (copy) {
      data.cc = copy;
    }
    this.submit({ data });
  }

  public submit(payload): void {
    this.store.dispatch(new ComposeEmail(payload));
  }
}
