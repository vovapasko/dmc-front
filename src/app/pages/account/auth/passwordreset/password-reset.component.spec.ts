import { PasswordResetComponent } from './password-reset.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ConfirmResetPasswordPayload } from '@models/payloads/user/confirm-reset-password';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../../../../shared/ui/ui.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '@services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<PasswordResetComponent>;
  const passwordResetPayload = {confirm: 'confirm', data: {password: 'password'}} as ConfirmResetPasswordPayload;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [
        CommonModule, ReactiveFormsModule, NgbAlertModule, UIModule, RouterTestingModule, StoreModule.forRoot({})
      ],
      providers: [HttpClient, HttpHandler, FormBuilder, AuthenticationService, Title, ErrorService, LoadingService, Store],
      declarations: [PasswordResetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, 'submit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.error$).toBeTruthy();
    expect(component.routeSubscription).toBeTruthy();
  });

  it('should initForm and return controls', () => {
    component.initForm();
    expect(component.resetForm).toBeTruthy();
    expect(component.resetFormControls).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
    expect(component.success).toBeFalsy();
  });

  it('should submit', () => {
    component.submit(passwordResetPayload);
    expect(component.submit).toHaveBeenCalled();
  });

  it('should setTitle', () => {
    component.setTitle(component.title);
    fixture.detectChanges();
    expect(document.title).toContain(component.title);
  });
});
