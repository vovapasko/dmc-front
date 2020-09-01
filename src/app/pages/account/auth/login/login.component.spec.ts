import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { LoginPayload } from '@models/payloads/auth/login';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '@shared/ui/ui.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '@services/auth.service';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<LoginComponent>;
  const loginPayload = { data: { email: 'login', password: 'password' } } as LoginPayload;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [
        CommonModule, ReactiveFormsModule, NgbAlertModule, UIModule, RouterTestingModule, StoreModule.forRoot({})
      ],
      providers: [HttpClient, HttpHandler, FormBuilder, AuthenticationService, Title, ErrorService, LoadingService, Store],
      declarations: [LoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
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
  });

  it('should initForm and return controls', () => {
    component.initForm();
    expect(component.loginForm).toBeTruthy();
    expect(component.loginFormControls).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should submit', () => {
    component.submit(loginPayload);
    expect(component.submit).toHaveBeenCalled();
  });

  it('should setTitle', () => {
    component.setTitle(component.title);
    fixture.detectChanges();
    expect(document.title).toContain(component.title);
  });
});
