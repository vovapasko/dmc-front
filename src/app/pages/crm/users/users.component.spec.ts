import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIModule} from '../../../shared/ui/ui.module';
import {NgbAlertModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgSelectModule} from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';
import {NotificationService} from '../../../core/services/notification.service';

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UsersComponent,
            ],
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                UIModule,
                NgbModalModule,
                NgbPaginationModule,
                NgApexchartsModule,
                NgbTypeaheadModule,
                Ng2SearchPipeModule,
                NgSelectModule,
                NgbAlertModule,
                HttpClientModule
            ],
            providers: [
                NotificationService
            ]
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

    it('should open create new user modal', async(() => {
        const openEl: DebugElement = fixture.debugElement.query(By.css('#openAddNewUserModal'));
        openEl.nativeElement.click();
        expect(openEl.nativeElement);
    }));

    it('should close new user modal', async(() => {
        const closeEl: DebugElement = fixture.debugElement.query(By.css('#cancel-new-user-button'));
        expect(closeEl).toBeFalsy();
    }));
});
