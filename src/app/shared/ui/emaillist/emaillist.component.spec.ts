import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaillistComponent } from './emaillist.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTooltipModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { UIModule } from '@shared/ui/ui.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { NgxEditorModule } from 'ngx-editor';
import { ColorPickerModule } from 'ngx-color-picker';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxMaskModule } from 'ngx-mask';
import { NestableModule } from 'ngx-nestable';
import { SharedModule } from '@shared/shared.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '@services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { NotificationService } from '@services/notification.service';
import { NewsService } from '@services/news.service';
import { ReademailComponent } from '@pages/email/reademail/reademail.component';
import { EmailService } from '@services/email.service';

describe('EmaillistComponent', () => {
  let component: EmaillistComponent;
  let fixture: ComponentFixture<EmaillistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        NgbDropdownModule,
        ClickOutsideModule,
        UIModule,
        NgbAlertModule,
        NgbModalModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        FormsModule,
        NgbPaginationModule,
        NgApexchartsModule,
        NgbTypeaheadModule,
        Ng2SearchPipeModule,
        NgSelectModule,
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
        NgbTooltipModule
      ],
      providers: [
        HttpClient,
        HttpHandler,
        FormBuilder,
        AuthenticationService,
        Title,
        ErrorService,
        LoadingService,
        Store,
        NotificationService,
        EmailService,
        NewsService
      ],
      declarations: [ EmaillistComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
