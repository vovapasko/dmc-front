import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SellersComponent} from './sellers.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('SellersComponent', () => {
    let component: SellersComponent;
    let fixture: ComponentFixture<SellersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SellersComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SellersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should generate create form controls', () => {
        expect(component.cf).toBeTruthy();
    });

    it('should generate update form controls', () => {
        expect(component.uf).toBeTruthy();
    });

    it('should open edit user modal', () => {
        const openEl: DebugElement = fixture.debugElement.query(By.css('#openEditModal'));
        openEl.nativeElement.click();
        expect(component.openModal).toHaveBeenCalled();
    });

    it('should call delete handler', () => {
        const closeEl: DebugElement = fixture.debugElement.query(By.css('#deleteContractor'));
        closeEl.nativeElement.click();
        expect(component.delete).toHaveBeenCalled();
    });
});
