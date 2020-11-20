import { SignupComponent } from './signup.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SignupPayload } from '@models/payloads/user/signup';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '@shared/ui/ui.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '@services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<SignupComponent>;
  const signupPayload = {
    invite: 'invite',
    data: {
      firstName: 'firstName',
      lastName: 'lastName',
      password: 'password',
      passwordConfirm: 'passwordConfirm'
    }
  } as SignupPayload;
  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [
        CommonModule, ReactiveFormsModule, NgbAlertModule, UIModule, RouterTestingModule, StoreModule.forRoot({})
      ],
      providers: [HttpClient, HttpHandler, FormBuilder, AuthenticationService, Title, ErrorService, LoadingService, Store],
      declarations: [SignupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
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
    expect(component.inviteSubscription).toBeTruthy();
  });

  it('should initForm and return controls', () => {
    component.initForm();
    expect(component.signupForm).toBeTruthy();
    expect(component.signupFormControls).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should submit', () => {
    spyOn(component, 'submit');
    component.submit(signupPayload);
    expect(component.submit).toHaveBeenCalled();
  });

  it('should processSubmit', () => {
    spyOn(component, 'processSubmit');
    component.initForm();
    component.processSubmit();
    expect(component.processSubmit).toHaveBeenCalled();
  });

  it('should setTitle', () => {
    component.setTitle(component.title);
    fixture.detectChanges();
    expect(document.title).toContain(component.title);
  });
});
