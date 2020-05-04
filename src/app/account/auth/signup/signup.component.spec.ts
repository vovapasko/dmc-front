import { SignupComponent } from './signup.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SignupPayload } from '../../../core/models/payloads/user/signup';

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
      imports: [CommonModule],
      providers: [],
      declarations: [SignupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, 'submit');
    spyOn(component, 'processSubmit');
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
    expect(component.f).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should submit', () => {
    component.submit(signupPayload);
    expect(component.submit).toHaveBeenCalled();
  });

  it('should processSubmit', () => {
    component.initForm();
    component.processSubmit();
    expect(component.processSubmit).toHaveBeenCalled();
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