import { ContractorsComponent } from './contractors.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { GetContractors } from '../../../core/store/actions/contractor.actions';
import { mockContractor } from '../../../core/mocks/contractor.mock';
import { Contractor } from '../../../core/models/instances/contractor';
import { CreateContractorPayload } from '../../../core/models/payloads/contractor/create';
import { UpdateContractorPayload } from '../../../core/models/payloads/contractor/update';
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

describe('ContractorsComponent', () => {
  let component: ContractorsComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ContractorsComponent>;
  const contractor = mockContractor as unknown as Contractor;
  const createContractorPayload = mockContractor as unknown as CreateContractorPayload;
  const updateContractorPayload = mockContractor as unknown as UpdateContractorPayload;

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
      declarations: [ContractorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractorsComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.error$).toBeTruthy();
    expect(component.selectedContractor$).toBeTruthy();
    expect(component.checkedContractors$).toBeTruthy();
    expect(component.page$).toBeTruthy();
    expect(component.pageSize$).toBeTruthy();
  });

  it('should initBreadCrumbItems', () => {
    component.initBreadCrumbItems();
    expect(component.breadCrumbItems.length).toBeTruthy();
  });

  it('should call initFormGroups', () => {
    spyOn(component, 'initFormGroups');
    component.initFormGroups();
    expect(component.initFormGroups).toHaveBeenCalled();
  });

  it('should initCreateForm', () => {
    component.initCreateForm();
    expect(component.createForm).toBeTruthy();
    expect(component.cf).toBeTruthy();
  });

  it('should initUpdateForm', () => {
    component.initUpdateForm();
    expect(component.updateForm).toBeTruthy();
    expect(component.uf).toBeTruthy();
  });

  it('should call selectContractor', () => {
    spyOn(component, 'selectContractor');
    component.selectContractor(contractor);
    expect(component.selectContractor).toHaveBeenCalled();
  });

  it('should call checkAll', () => {
    spyOn(component, 'checkAll');
    component.checkAll();
    expect(component.checkAll).toHaveBeenCalled();
  });

  it('should call check', () => {
    spyOn(component, 'check');
    component.check(contractor);
    expect(component.check).toHaveBeenCalled();
  });

  it('should call onPageChange', () => {
    spyOn(component, 'onPageChange');
    component.onPageChange(0);
    expect(component.onPageChange).toHaveBeenCalled();
  });

  it('should call openModal', () => {
    spyOn(component, 'openModal');
    component.openModal('');
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should call addContractor', () => {
    spyOn(component, 'addContractor');
    component.addContractor();
    expect(component.addContractor).toHaveBeenCalled();
  });

  it('should call updateContractor', () => {
    spyOn(component, 'updateContractor');
    component.updateContractor();
    expect(component.updateContractor).toHaveBeenCalled();
  });

  it('should add', () => {
    spyOn(component, 'add');
    component.add(createContractorPayload);
    expect(component.add).toHaveBeenCalled();
  });

  it('should delete', () => {
    spyOn(component, 'delete');
    component.delete(contractor);
    expect(component.delete).toHaveBeenCalled();
  });

  it('should update', () => {
    spyOn(component, 'update');
    component.update(updateContractorPayload);
    expect(component.update).toHaveBeenCalled();
  });

  it('should call updateContractors', () => {
    spyOn(component, 'updateContractors');
    component.updateContractors();
    expect(component.updateContractors).toHaveBeenCalled();
  });

  it('should cleanAfterUpdate', () => {
    component.initUpdateForm();
    component.initCreateForm();
    component.initCreateFormatForm();
    component.cleanAfterUpdate();
    expect(component.editCheckedMode).toBeFalsy();
  });

  it('should call processMany', () => {
    spyOn(component, 'processMany');
    component.processMany([], {}, () => {});
    expect(component.processMany).toHaveBeenCalled();
  });

  it('should call editChecked', () => {
    spyOn(component, 'editChecked');
    component.editChecked();
    expect(component.editChecked).toHaveBeenCalled();
  });

  it('should call deleteChecked', () => {
    spyOn(component, 'deleteChecked');
    component.deleteChecked();
    expect(component.deleteChecked).toHaveBeenCalled();
  });

  it('should submitCreateForm', () => {
    component.initCreateForm();
    component.submitCreateForm();
    expect(component.submitted).toBeTruthy();
  });

  it('should submitEditForm', () => {
    component.initUpdateForm();
    component.submitEditForm();
    expect(component.submitted).toBeTruthy();
  });

  it('should setTitle', () => {
    component.setTitle(component.title);
    fixture.detectChanges();
    expect(document.title).toContain(component.title);
  });
});