import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordConfirmComponent } from './forgot-password-confirm.component';
import { CommonModule } from '@angular/common';
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
import { PasswordResetComponent } from '@pages/account/auth/passwordreset/password-reset.component';
import { SocialAuthService } from 'angularx-social-login';

describe('ForgotPasswordConfirmComponent', () => {
  let component: ForgotPasswordConfirmComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ForgotPasswordConfirmComponent>;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [
        CommonModule, ReactiveFormsModule, NgbAlertModule, UIModule, RouterTestingModule, StoreModule.forRoot({})
      ],
      providers: [HttpClient, HttpHandler, SocialAuthService,  FormBuilder, AuthenticationService, Title, ErrorService, LoadingService, Store],
      declarations: [ForgotPasswordConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordConfirmComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, 'submit');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
