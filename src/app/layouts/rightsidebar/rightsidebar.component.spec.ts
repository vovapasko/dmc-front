import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RightsidebarComponent} from './rightsidebar.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('RightsidebarComponent', () => {
    let component: RightsidebarComponent;
    let fixture: ComponentFixture<RightsidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RightsidebarComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RightsidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
