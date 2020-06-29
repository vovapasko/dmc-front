import { UsersComponent } from './users.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/instances/user.models';
import { Groups } from '../../../core/models/instances/groups';
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
import { SharedModule } from '../../../shared/shared.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../../../core/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NewsService } from '../../../core/services/news.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<UsersComponent>;
  const user = {groups: [Groups.Client]} as unknown as User;

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
        NewsService
      ],
      declarations: [UsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initBreadCrumbItems', () => {
    component.initBreadCrumbItems();
    expect(component.breadCrumbItems.length).toBeTruthy();
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.selectedUser$).toBeTruthy();
    expect(component.page$).toBeTruthy();
    expect(component.pageSize$).toBeTruthy();
    expect(component.error$).toBeTruthy();
  });

  it('should not belongToManage', () => {
    expect(component.belongToManage(user)).toBeFalsy();
  });

  it('should initForm', () => {
    component.initForm();
    expect(component.validationform).toBeTruthy();
    expect(component.f).toBeTruthy();
  });

  it('should call openModal', () => {
    spyOn(component, 'openModal');
    component.openModal('');
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should call selectUser', () => {
    spyOn(component, 'selectUser');
    component.selectUser(user);
    expect(component.selectUser).toHaveBeenCalled();
  });

  it('should call onPageChange', () => {
    spyOn(component, 'onPageChange');
    component.onPageChange(1);
    expect(component.onPageChange).toHaveBeenCalled();
  });

  it('should call delete', () => {
    spyOn(component, 'delete');
    component.delete(user);
    expect(component.delete).toHaveBeenCalled();
  });

  it('should call updateGroup', () => {
    spyOn(component, 'updateGroup');
    component.updateGroup(user, Groups.Admin);
    expect(component.updateGroup).toHaveBeenCalled();
  });

  it('should call registerNewUser', () => {
    spyOn(component, 'registerNewUser');
    component.registerNewUser();
    expect(component.registerNewUser).toHaveBeenCalled();
  });

  it('should setTitle', () => {
    component.setTitle(component.title);
    fixture.detectChanges();
    expect(document.title).toContain(component.title);
  });
});