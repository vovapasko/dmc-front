import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PortletComponent} from './portlet.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClickOutsideModule} from 'ng-click-outside';
import {NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

describe('PortletComponent', () => {
    let component: PortletComponent;
    let fixture: ComponentFixture<PortletComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PortletComponent],
            imports: [
                CommonModule,
                FormsModule,
                ClickOutsideModule,
                NgbCollapseModule,
                NgbDatepickerModule,
                NgbTimepickerModule,
                NgbDropdownModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PortletComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
