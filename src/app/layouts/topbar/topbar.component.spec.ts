import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopbarComponent} from './topbar.component';
import {Notification, NotificationType} from '../../core/models/instances/notification';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../pages/pages-routing.module';

describe('TopbarComponent', () => {
    let component: TopbarComponent;
    let fixture: ComponentFixture<TopbarComponent>;
    let location: Location;
    let router: Router;
    const links = {
        profile: 'profile/'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopbarComponent],
            imports: [RouterTestingModule.withRoutes(routes)],
        })
            .compileComponents();
        router = TestBed.get(Router);
        location = TestBed.get(Location);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add new notification', () => {
        const magicId = 1;
        const notification = new Notification(magicId, NotificationType.info, 'test', 'test', 100);
        component.addNotification(notification);
        const addedNotification = component.notifications.find(el => el.id === magicId);
        expect(addedNotification).toBeTruthy();
    });

    it('should clear all notifications', () => {
        component.clearAll();
        expect(component.notifications.length).toBe(0);
    });

    it('should logout user', () => {
        const logoutButton: DebugElement = fixture.debugElement.query(By.css('#logout'));
        logoutButton.nativeElement.click();
        const loginPage = document.location.href.indexOf('login');
        expect(loginPage).toBeTruthy();
    });

    it('should navigate to profile', () => {
        router.navigate([links.profile]).then(() => {
            expect(location.href).toBe(links.profile);
        });
    });
});
