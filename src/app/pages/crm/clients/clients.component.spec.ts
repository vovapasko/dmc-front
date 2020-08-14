import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule, NgbPaginationModule,
  NgbPopoverModule, NgbProgressbarModule, NgbTooltipModule, NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '@shared/ui/ui.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { ColorPickerModule } from 'ngx-color-picker';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { AuthenticationService } from '@services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { Store, StoreModule } from '@ngrx/store';
import { NotificationService } from '@services/notification.service';
import { RouterModule } from '@angular/router';
import { TicketService } from '@services/ticket.service';
import { ClientService } from '@services/client.service';
import { IAppState } from '@store/state/app.state';
import { ClientsComponent } from '@pages/crm/clients/clients.component';

describe('ProxyComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
        CommonModule,
        SharedModule,
        NgbAlertModule,
        NgbDatepickerModule,
        NgbPopoverModule,
        UIModule,
        NgbDropdownModule,
        FormsModule,
        DndModule,
        NgbModalModule,
        NgbPaginationModule,
        NgApexchartsModule,
        FullCalendarModule,
        Ng2SearchPipeModule,
        HttpClientModule,
        NgbTypeaheadModule,
        NgbProgressbarModule,
        NgbTooltipModule,
        ReactiveFormsModule,
        NgxEditorModule,
        ColorPickerModule,
        UiSwitchModule,
        ImageCropperModule,
        FileUploadModule,
        ArchwizardModule,
        NgSelectModule,
        NgxMaskModule.forRoot()
      ],
      providers: [
        Store,
        HttpClient,
        HttpHandler,
        FormBuilder,
        AuthenticationService,
        Title,
        ErrorService,
        LoadingService,
        Store,
        NotificationService,
        TicketService,
        ClientService

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initForm', () => {
    expect(component.createClientForm).toBeTruthy();
  });

  it('should init bread crumb items', () => {
    expect(component.breadCrumbItems).toBeTruthy();
  });

  it('should init create clients form', () => {
    expect(component.createClientForm).toBeTruthy();
  });

});
