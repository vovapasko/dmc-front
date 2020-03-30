import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {DebugElement} from '@angular/core';
import {By, Title} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {UIModule} from '../../../shared/ui/ui.module';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
    let component: LoginComponent;
    const titleService: Title = new Title(null);

    let fixture: ComponentFixture<LoginComponent>;
    const credentials = {username: 'leongaban', password: 'testpass'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                CommonModule,
                ReactiveFormsModule,
                NgbAlertModule,
                UIModule,
                RouterTestingModule,
                HttpClientModule
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fill login field', () => {
        const loginField: DebugElement = fixture.debugElement.query(By.css('#email'));
        loginField.nativeElement.value = credentials.username;
        expect(loginField.nativeElement.value).toBe(credentials.username);
    });

    it('should fill password field', () => {
        const loginField: DebugElement = fixture.debugElement.query(By.css('#password'));
        loginField.nativeElement.value = credentials.password;
        expect(loginField.nativeElement.value).toBe(credentials.password);
    });

    it('should generate form controls', () => {
        expect(component.f).toBeTruthy();
    });

    it('should set title', () => {
        const title = 'Login';
        component.setTitle(title);
        expect(document.title).toBe(title);
    });
});
