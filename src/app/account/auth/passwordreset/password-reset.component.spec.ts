import { PasswordResetComponent } from './password-reset.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ConfirmResetPasswordPayload } from '../../../core/models/payloads/user/confirm-reset-password';

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
      imports: [CommonModule],
      providers: [],
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
    expect(component.f).toBeTruthy();
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
    // * arrange
    const title = 'Hey there, i hope you are enjoying this article';
    // * act
    component.setTitle(title);
    fixture.detectChanges();
    // * assert
    expect(document.title).toContain(title);
  });
});