import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupComponent} from './signup.component';
import {DebugElement} from '@angular/core';
import {By, Title} from '@angular/platform-browser';

describe('SignupComponent', () => {
    const titleService: Title = new Title(null);
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    const passwords = {password: 'password', confirm: 'password'};
    const names = {firstName: 'First name', lastName: 'Last name'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fill first name field', () => {
        const firstNamedField: DebugElement = fixture.debugElement.query(By.css('#first-name'));
        firstNamedField.nativeElement.value = names.firstName;
        expect(firstNamedField.nativeElement.value).toBe(names.firstName);
    });

    it('should fill last name field', () => {
        const lastNameField: DebugElement = fixture.debugElement.query(By.css('#last-name'));
        lastNameField.nativeElement.value = names.lastName;
        expect(lastNameField.nativeElement.value).toBe(names.lastName);
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
