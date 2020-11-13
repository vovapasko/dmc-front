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
import { urltoFile, bytesToSize } from '@helpers/utility';

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
  imageTypes = ['']

  constructor(
    private emailService: EmailService,
    private router: Router
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
    // @ts-ignore
    const payload = { attachmentId: attachment.attachemntId };
    this.emailService.getAttachment(payload).subscribe(
      (response: Attachment) => {
        urltoFile(response.base64, response.name, response.type).then(file => {
          const url = window.URL.createObjectURL(file);
          window.open(url);
        });
      }
    );
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
    if (composeEmailForm.invalid) {
      return;
    }
    const copy = this.composeEmailFormControls.copy.value.split(separators.whitespace);
    const { receiver, subject, content, attachments } = this.composeEmailForm.value;
    const data = { receiver, copy, subject, content, attachments };
    this.submit({ data });
  }

  public submit(payload): void {
    console.log(payload);
  }
}
