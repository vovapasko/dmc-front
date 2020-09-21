import { ProfileComponent } from './profile.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ExtrasRoutingModule } from '../extras-routing.module';
import { UIModule } from '../../../shared/ui/ui.module';
import { NgbAlertModule, NgbProgressbarModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../../../core/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { Store, StoreModule } from '@ngrx/store';
import { NotificationService } from '../../../core/services/notification.service';
import { UserService } from '../../../core/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ProfileComponent>;
  const updateProfilePayload = {
    data: {
      firstName: 'firstName',
      lastName: 'lastName',
      avatar: null
    }
  };
  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [
        CommonModule,
        ExtrasRoutingModule,
        UIModule,
        NgbProgressbarModule,
        NgbTabsetModule,
        ReactiveFormsModule,
        NgbAlertModule,
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
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
        UserService
      ],
      declarations: [ProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
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
    expect(component.user$).toBeTruthy();
  });

  it('should initBreadCrumbItems', () => {
    component.initBreadCrumbItems();
    expect(component.breadCrumbItems.length).toBeTruthy();
  });

  it('should initForm', () => {
    component.initForm();
    expect(component.profileForm).toBeTruthy();
    expect(component.f).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    component.onSubmit();
    expect(component.submitted).toBeFalsy();
  });

  it('should call submit', () => {
    spyOn(component, 'submit');
    component.submit();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should call onFileChanges', () => {
    spyOn(component, 'onFileChanges');
    component.onFileChanges([]);
    expect(component.onFileChanges).toHaveBeenCalled();
  });

  it('should call changePassword', () => {
    spyOn(component, 'changePassword');
    component.changePassword();
    expect(component.changePassword).toHaveBeenCalled();
  });

  it('should setTitle', () => {
    component.setTitle(component.title);
    fixture.detectChanges();
    expect(document.title).toContain(component.title);
  });
});
