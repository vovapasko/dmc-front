import { TopbarComponent } from './topbar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Notification, NotificationType } from '../../core/models/instances/notification';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<TopbarComponent>;
  const payload = {data: {name: 'name'}};
  const format = {data: {postFormat: 'postFormat'}};

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [CommonModule],
      providers: [],
      declarations: [TopbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, 'initCreateFormatForm');
    spyOn(component, 'initCreateHashtagForm');
    spyOn(component, 'initFormGroups');
    spyOn(component, 'openModal');
    spyOn(component, 'logout');
    spyOn(component, 'clearAll');
    spyOn(component, 'close');
    spyOn(component, 'submit');
    spyOn(component, 'createFormat');
    spyOn(component, 'createHashtag');
    spyOn(component, 'toggleMobileMenu');
    spyOn(component, 'submitCreateFormatForm');
    spyOn(component, 'submitCreateHashtagForm');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initFormGroups', () => {
    component.initFormGroups();
    expect(component.initFormGroups).toHaveBeenCalled();
    expect(component.initCreateHashtagForm).toHaveBeenCalled();
    expect(component.initCreateFormatForm).toHaveBeenCalled();
  });

  it('should initCreateHashtagForm', () => {
    component.initCreateHashtagForm();
    expect(component.createHashtagForm);
    expect(component.ch);
  });

  it('should initCreateFormatForm', () => {
    component.initCreateFormatForm();
    expect(component.createFormatForm);
    expect(component.cf);
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.error$).toBeTruthy();
    expect(component.notificationHistory$).toBeTruthy();
    expect(component.user$).toBeTruthy();
  });

  it('should call openModal', () => {
    component.openModal('');
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should submitCreateHashtagForm', () => {
    component.initCreateHashtagForm();
    component.submitCreateHashtagForm();
    expect(component.submitCreateHashtagForm).toHaveBeenCalled();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should submitCreateFormatForm', () => {
    component.initCreateFormatForm();
    component.submitCreateFormatForm();
    expect(component.submitCreateFormatForm).toHaveBeenCalled();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should submit', () => {
    component.submit(component.createFormatForm, component.createFormat.bind(component), payload);
    expect(component.submitted).toBeTruthy();
  });

  it('should call createHashtag', () => {
    component.createHashtag(payload);
    expect(component.createHashtag).toHaveBeenCalled();
  });

  it('should call createFormat', () => {
    component.createFormat(format);
    expect(component.createFormat).toHaveBeenCalled();
  });

  it('should call close', () => {
    component.close(new Notification(0, NotificationType.info, 'hello', 'hello', 1000));
    expect(component.close).toHaveBeenCalled();
  });

  it('should call toggleMobileMenu', () => {
    component.toggleMobileMenu(new Event('click'));
    expect(component.toggleMobileMenu).toHaveBeenCalled();
  });

  it('should call logout', () => {
    component.logout();
    expect(component.logout).toHaveBeenCalled();
  });

  it('should call clearAll', () => {
    component.clearAll();
    expect(component.clearAll).toHaveBeenCalled();
  });
});