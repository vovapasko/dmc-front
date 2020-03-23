import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordResetComponent} from './password-reset.component';
import {DebugElement} from '@angular/core';
import {By, Title} from '@angular/platform-browser';

describe('PasswordresetComponent', () => {
    const titleService: Title = new Title(null);
    const passwords = {password: 'password', confirm: 'password'};
    let component: PasswordResetComponent;
    let fixture: ComponentFixture<PasswordResetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordResetComponent]
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
        expect(titleService.getTitle()).toBe(title);
    });
});
