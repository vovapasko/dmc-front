import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbCollapseModule,
  NgbModalModule,
  NgbTypeaheadModule,
  NgbAlertModule, NgbDatepickerModule, NgbPopoverModule, NgbProgressbarModule, NgbTooltipModule, NgbTabsetModule, NgbAccordionModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';

import { EmailRoutingModule } from './email-routing.module';

import { UIModule } from '@shared/ui/ui.module';

import { InboxComponent } from './inbox/inbox.component';
import { ReademailComponent } from './reademail/reademail.component';
import { ComposeemailComponent } from './composeemail/composeemail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { ColorPickerModule } from 'ngx-color-picker';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxMaskModule } from 'ngx-mask';
import { NestableModule } from 'ngx-nestable';
import { SharedModule } from '@shared/shared.module';
import { EmailsComponent } from '@pages/email/emails/emails.component';
import { SentComponent } from '@pages/email/sent/sent.component';
import { TrashComponent } from '@pages/email/trash/trash.component';


@NgModule({
  declarations: [InboxComponent, ReademailComponent, ComposeemailComponent, EmailsComponent, SentComponent, TrashComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    UIModule,
    NgbModalModule,
    NgApexchartsModule,
    NgbTypeaheadModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    NgbAlertModule,
    CommonModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    NgxEditorModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    ColorPickerModule,
    UiSwitchModule,
    FileUploadModule,
    ArchwizardModule,
    NgxMaskModule.forRoot(),
    NestableModule,
    NgbPopoverModule,
    SharedModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbCollapseModule,
  ]
})
export class EmailModule { }
