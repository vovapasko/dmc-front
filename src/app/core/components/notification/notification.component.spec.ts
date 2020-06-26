import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from '../../services/notification.service';
import { Notification, NotificationType } from '../../models/instances/notification';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      providers: [NotificationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.notifications$).toBeTruthy();
  });

  it('should call close', () => {
    spyOn(component, 'close');
    component.close(new Notification(0, NotificationType.info, 'test', 'test', 1000));
    expect(component.close).toHaveBeenCalled();
  })
});
