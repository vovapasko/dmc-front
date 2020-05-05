import { UsersComponent } from './users.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/instances/user.models';
import { Groups } from '../../../core/models/instances/groups';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<UsersComponent>;
  const user = {groups: ['Admin']} as unknown as User;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [CommonModule],
      providers: [],
      declarations: [UsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, 'openModal')
    spyOn(component, 'registerNewUser')
    spyOn(component, 'register')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initBreadCrumbItems', () => {
    component.initBreadCrumbItems();
    expect(component.breadCrumbItems.length).toBeTruthy();
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.selectedUser$).toBeTruthy();
    expect(component.page$).toBeTruthy();
    expect(component.pageSize$).toBeTruthy();
    expect(component.paginatedUserData$).toBeTruthy();
    expect(component.error$).toBeTruthy();
  });

  it('should belongToManage', () => {
    expect(component.belongToManage(user)).toBeTruthy();
  });

  it('should initSelectOptions', () => {
    component.initSelectOptions()
    expect(component.selectValue).toBeTruthy();
  });

  it('should initForm', () => {
    component.initForm();
    expect(component.validationform).toBeTruthy();
    expect(component.f).toBeTruthy();
  });

  it('should call openModal', () => {
    component.openModal('');
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should call selectUser', () => {
    component.selectUser(user);
    expect(component.selectUser).toHaveBeenCalled();
  });

  it('should call onPageChange', () => {
    component.onPageChange(1);
    expect(component.onPageChange).toHaveBeenCalled();
  });

  it('should call delete', () => {
    component.delete(user);
    expect(component.delete).toHaveBeenCalled();
  });

  it('should call updateGroup', () => {
    component.updateGroup(user, Groups.Admin);
    expect(component.updateGroup).toHaveBeenCalled();
  });

  it('should call registerNewUser', () => {
    component.registerNewUser();
    expect(component.submitted).toBeTruthy();
    expect(component.register).toHaveBeenCalled();
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