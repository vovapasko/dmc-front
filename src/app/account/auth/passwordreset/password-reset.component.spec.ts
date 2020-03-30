import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordResetComponent} from './password-reset.component';
import {DebugElement} from '@angular/core';
import {By, Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {UIModule} from '../../../shared/ui/ui.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {NotificationService} from '../../../core/services/notification.service';

describe('PasswordresetComponent', () => {
    const titleService: Title = new Title(null);
    const passwords = {password: 'password', confirm: 'password'};
    let component: PasswordResetComponent;
    let fixture: ComponentFixture<PasswordResetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordResetComponent],
            imports: [
                CommonModule,
                ReactiveFormsModule,
                NgbAlertModule,
                UIModule,
                RouterTestingModule,
                HttpClientModule
            ],
            providers: [
                NotificationService
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordResetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fill password field', () => {
        const passwordField: DebugElement = fixture.debugElement.query(By.css('#password'));
        passwordField.nativeElement.value = passwords.password;
        expect(passwordField.nativeElement.value).toBe(passwords.password);
    });

    it('should fill confirm password field', () => {
        const confirmPasswordField: DebugElement = fixture.debugElement.query(By.css('#confirm-password'));
        confirmPasswordField.nativeElement.value = passwords.confirm;
        expect(confirmPasswordField.nativeElement.value).toBe(passwords.confirm);
    });

    it('should generate form controls', () => {
        expect(component.f).toBeTruthy();
    });

    it('should set title', () => {
        const title = 'Reset password';
        component.setTitle(title);
        expect(document.title).toBe(title);
    });
});
