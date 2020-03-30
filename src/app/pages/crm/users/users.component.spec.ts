import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('ContactsComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should generate form controls', () => {
        expect(component.f).toBeTruthy();
    });

    it('should open create new user modal', () => {
        const openEl: DebugElement = fixture.debugElement.query(By.css('#openAddNewUserModal'));
        openEl.nativeElement.click();
        const newUserEmailField: DebugElement = fixture.debugElement.query(By.css('#email'));
        expect(newUserEmailField).toBeTruthy();
    });

    it('should open close new user modal', () => {
        const closeEl: DebugElement = fixture.debugElement.query(By.css('#closeAddNewUserModal'));
        closeEl.nativeElement.click();
        const newUserEmailField: DebugElement = fixture.debugElement.query(By.css('#email'));
        expect(newUserEmailField).toBeFalsy();
    });
});
