import { ProfileComponent } from './profile.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

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
      imports: [CommonModule],
      providers: [],
      declarations: [ProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, 'submit');
    spyOn(component, 'update');
    spyOn(component, 'onFileChanges');
    spyOn(component, 'update');
    spyOn(component, 'changePassword');
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
    expect(component.submitted).toBeTruthy();
  });

  it('should call submit', () => {
    component.submit();
    expect(component.submit).toHaveBeenCalled();
    expect(component.update).toHaveBeenCalled();
  });

  it('should call onFileChanges', () => {
    component.onFileChanges([]);
    expect(component.onFileChanges).toHaveBeenCalled();
  });

  it('should call update', () => {
    component.update(updateProfilePayload);
    expect(component.update).toHaveBeenCalled();
  });

  it('should call changePassword', () => {
    component.changePassword();
    expect(component.changePassword).toHaveBeenCalled();
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