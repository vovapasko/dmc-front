import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactsComponent} from './contacts.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('ContactsComponent', () => {
    let component: ContactsComponent;
    let fixture: ComponentFixture<ContactsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContactsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactsComponent);
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
