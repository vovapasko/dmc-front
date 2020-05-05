import { TopbarComponent } from './topbar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Notification, NotificationType } from '../../core/models/instances/notification';
import { RouterModule } from '@angular/router';
import { NgbAlertModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { UIModule } from '../../shared/ui/ui.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorService } from '../../core/services/error.service';
import { LoadingService } from '../../core/services/loading.service';
import { Store, StoreModule } from '@ngrx/store';
import { NotificationService } from '../../core/services/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ContractorsNamesPipe } from '../../shared/pipes/contractors-names.pipe';
import { SharedModule } from '../../shared/shared.module';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<TopbarComponent>;
  const payload = { data: { name: 'name' } };
  const format = { data: { postFormat: 'postFormat' } };

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
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot({})
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
        NotificationService
      ],
      declarations: [TopbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initFormGroups', () => {
    spyOn(component, 'initFormGroups');
    component.initFormGroups();
    expect(component.initFormGroups).toHaveBeenCalled();
  });

  it('should initCreateHashtagForm', () => {
    component.initCreateHashtagForm();
    expect(component.createHashtagForm);
    expect(component.ch);
  });

  it('should initCreateFormatForm', () => {
    component.initCreateFormatForm();
    expect(component.createFormatForm);
    expect(component.cf);
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.error$).toBeTruthy();
    expect(component.notificationHistory$).toBeTruthy();
    expect(component.user$).toBeTruthy();
  });

  it('should call openModal', () => {
    spyOn(component, 'openModal');
    component.openModal('');
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should submitCreateHashtagForm', () => {
    spyOn(component, 'submitCreateHashtagForm');
    component.initCreateHashtagForm();
    component.submitCreateHashtagForm();
    expect(component.submitCreateHashtagForm).toHaveBeenCalled();
  });

  it('should submitCreateFormatForm', () => {
    spyOn(component, 'submitCreateFormatForm');
    component.initCreateFormatForm();
    component.submitCreateFormatForm();
    expect(component.submitCreateFormatForm).toHaveBeenCalled();
  });

  it('should submit', () => {
    component.initCreateFormatForm();
    component.submit(component.createFormatForm, component.createFormat.bind(component), payload);
    expect(component.submitted).toBeTruthy();
  });

  it('should call createHashtag', () => {
    spyOn(component, 'createHashtag');
    component.createHashtag(payload);
    expect(component.createHashtag).toHaveBeenCalled();
  });

  it('should call createFormat', () => {
    spyOn(component, 'createFormat');
    component.createFormat(format);
    expect(component.createFormat).toHaveBeenCalled();
  });

  it('should call close', () => {
    spyOn(component, 'close');
    component.close(new Notification(0, NotificationType.info, 'hello', 'hello', 1000));
    expect(component.close).toHaveBeenCalled();
  });

  it('should call toggleMobileMenu', () => {
    spyOn(component, 'toggleMobileMenu');
    component.toggleMobileMenu(new Event('click'));
    expect(component.toggleMobileMenu).toHaveBeenCalled();
  });

  it('should call logout', () => {
    spyOn(component, 'logout');
    component.logout();
    expect(component.logout).toHaveBeenCalled();
  });

  it('should call clearAll', () => {
    spyOn(component, 'clearAll');
    component.clearAll();
    expect(component.clearAll).toHaveBeenCalled();
  });
});