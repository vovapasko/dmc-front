import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { LoginPayload } from '../../../core/models/payloads/auth/login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<LoginComponent>;
  const loginPayload = {data: {email: 'login', password: 'password'}} as LoginPayload;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [CommonModule],
      providers: [],
      declarations: [LoginComponent],
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
    expect(component.f).toBeTruthy();
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
    // * arrange
    const title = 'Hey there, i hope you are enjoying this article';
    // * act
    component.setTitle(title);
    fixture.detectChanges();
    // * assert
    expect(document.title).toContain(title);
  });
});