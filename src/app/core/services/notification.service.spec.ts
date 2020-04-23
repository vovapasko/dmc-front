import { NotificationService } from './notification.service';
import { Notification, NotificationType } from '../models/instances/notification';

describe('NotificationService', () => {
  let service: NotificationService;
  const mockNotification = new Notification(1, NotificationType.success, 'title', 'message', 3500);

  beforeEach(() => {
    service = new NotificationService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should create notifications behavior subject', () => {
    expect(service.notifications$).toBeTruthy();
  });

  it('should create history behavior subject', () => {
    expect(service.notificationHistory$).toBeTruthy();
  });

  it('should get notifications', () => {
    expect(service.notifications.length).toBe(0);
  });

  it('should set notifications', () => {
    service.notifications = [mockNotification];
    expect(service.notifications.length).toBe(1);
  });

  it('should get history', () => {
    expect(service.history.length).toBe(0);
  });

  it('should set history', () => {
    service.history = [mockNotification];
    expect(service.history.length).toBe(1);
  });

  it('should register notification in notifications behavior subject', (done: DoneFn) => {
    service.notifications$.subscribe((notifications: Notification[]) => {
      if (notifications.length) {
        expect(notifications.indexOf(mockNotification) !== -1).toBeTruthy();
        done();
      }
    });
    service.registerNotification(mockNotification);
  });

  it('should register notification in history behavior subject', (done: DoneFn) => {
    service.notificationHistory$.subscribe((history: Notification[]) => {
      if (history.length) {
        expect(history.indexOf(mockNotification) !== -1).toBeTruthy();
        done();
      }
    });
    service.registerNotification(mockNotification);
  });

  it('should return track time id', () => {
    expect(service.trackTime(mockNotification)).toBeTruthy();
  });

  it('should remove from history', () => {
    service.history = [mockNotification];
    service.removeFromHistory(mockNotification);
    expect(service.history.indexOf(mockNotification) === -1).toBeTruthy();
  });
});
