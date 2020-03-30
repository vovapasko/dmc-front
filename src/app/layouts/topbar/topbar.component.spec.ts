import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopbarComponent} from './topbar.component';
import {Notification, NotificationType} from '../../core/models/instances/notification';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../pages/pages-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NotificationService} from '../../core/services/notification.service';
import {AuthenticationService} from '../../core/services/auth.service';
import {UserService} from '../../core/services/user.service';

describe('TopbarComponent', () => {
    let component: TopbarComponent;
    let fixture: ComponentFixture<TopbarComponent>;
    let router: Router;
    const links = {
        profile: 'profile/'
    };
    const hrefs = {
        // tslint:disable-next-line:max-line-length
        profile: '#profile-link',
        dropdown: '#profileDropdown'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopbarComponent],
            imports: [
                RouterTestingModule.withRoutes(routes),
                HttpClientModule
            ],
            providers: [
                NotificationService,
                AuthenticationService,
                UserService
            ]
        })
            .compileComponents();
        router = TestBed.get(Router);
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

    it('should navigate to profile', () => {
        const el = fixture.debugElement.nativeElement;
        const bt = el.querySelectorAll(hrefs.dropdown)[0];
        bt.click();
        const li = el.querySelectorAll(hrefs.profile)[0];
        li.click();
        expect(document.location.href.indexOf(links.profile) !== 0).toBeTruthy();
    });

    it('should logout user', () => {
        const logoutButton: DebugElement = fixture.debugElement.query(By.css('#logout'));
        logoutButton.nativeElement.click();
        const loginPage = document.location.href.indexOf('login');
        expect(loginPage).toBeTruthy();
    });
});
