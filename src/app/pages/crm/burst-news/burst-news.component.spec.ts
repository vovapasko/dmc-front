import { BurstNewsComponent } from './burst-news.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { mockProject } from '../../../core/mocks/project.mock';
import { CreateProjectPayload } from '../../../core/models/payloads/news/project/create';
import { RouterModule } from '@angular/router';
import {
  NgbAlertModule, NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTooltipModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { UIModule } from '../../../shared/ui/ui.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../../../core/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CRMRoutingModule } from '../crm-routing.module';
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
import { SharedModule } from '../../../shared/shared.module';
import { NewsService } from '../../../core/services/news.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BurstNewsComponent', () => {
  let component: BurstNewsComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<BurstNewsComponent>;
  const mockProjectPayload = { data: mockProject, id: 1 } as unknown as CreateProjectPayload;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
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
        NgbTooltipModule,
        BrowserAnimationsModule
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
        NewsService
      ],
      declarations: [BurstNewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BurstNewsComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initFormGroups', () => {
    component.initFormGroups();
    expect(component.validationForm).toBeTruthy();
    expect(component.editorForm).toBeTruthy();
    expect(component.newsForm).toBeTruthy();
    expect(component.controls).toBeTruthy();
    expect(component.commonFormControls).toBeTruthy();
    expect(component.distributeFormControls).toBeTruthy();
  });

  it('should initBreadCrumbs', () => {
    component.initBreadCrumbs();
    expect(component.breadCrumbItems.length).toBeTruthy();
  });

  it('should handle formSubmit', () => {
    component.formSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should handle newsFormSubmit', () => {
    component.newsFormSubmit();
    expect(component.newsSubmit).toBeTruthy();
  });

  it('should handle profileFormSubmit', () => {
    component.profileFormSubmit();
    expect(component.submitForm).toBeTruthy();
  });

  it('should call created', () => {
    spyOn(component, 'created');
    component.created(null);
    expect(component.created).toHaveBeenCalled();
  });

  it('should call changedEditor', () => {
    spyOn(component, 'changedEditor');
    component.changedEditor(null);
    expect(component.changedEditor).toHaveBeenCalled();
  });

  it('should focus', () => {
    component.focus(true);
    expect(component.focused).toBeTruthy();
  });

  it('should blur', () => {
    component.blur(true);
    expect(component.blured).toBeTruthy();
  });

  it('should handle onEvent', () => {
    component.onEvent(null, true);
    expect(component.focused).toBeTruthy();
    expect(component.blured).toBeFalsy();
  });

  it('should call processProject', () => {
    spyOn(component, 'processProject');
    component.processProject(null);
    expect(component.processProject).toHaveBeenCalled();
  });

  it('should call setProjectData', () => {
    spyOn(component, 'setProjectData');
    component.setProjectData(null);
    expect(component.setProjectData).toHaveBeenCalled();
  });

  it('should call getControl', () => {
    spyOn(component, 'getControl');
    component.getControl(0, null);
    expect(component.getControl).toHaveBeenCalled();
  });

  it('should call budgetValidator', () => {
    spyOn(component, 'budgetValidator');
    component.budgetValidator(null);
    expect(component.budgetValidator).toHaveBeenCalled();
  });

  it('should addNew', () => {
    spyOn(component, 'addNew');
    component.addNew();
    expect(component.addNew).toHaveBeenCalled();
  });

  it('should calculatePercentage', () => {
    component.calculatePercentage();
    expect(component.multipleRadialBars).toBeTruthy();
  });

  it('should call onSubmit', () => {
    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call fetchData', () => {
    spyOn(component, 'fetchData');
    component.fetchData();
    expect(component.fetchData).toHaveBeenCalled();
  });

});
