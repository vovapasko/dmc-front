import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContractorsComponent} from './contractors.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIModule} from '../../../shared/ui/ui.module';
import {NgbAlertModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {CRMRoutingModule} from '../crm-routing.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgSelectModule} from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';
import {NotificationService} from '../../../core/services/notification.service';

describe('ContractorsComponent', () => {
    let component: ContractorsComponent;
    let fixture: ComponentFixture<ContractorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContractorsComponent],
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
        fixture = TestBed.createComponent(ContractorsComponent);
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

    it('should open new contractor modal', async(() => {
        const openEl: DebugElement = fixture.debugElement.query(By.css('#add-new-contractor-button'));
        openEl.nativeElement.click();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const el = document.querySelector('body > ngb-modal-window > div > div > div.modal-header.bg-dark > h4');
            const text = el.textContent;

            expect(text).toBe('Добавить контрагента');
        });

        setTimeout(() => {
        }, 1000);
    }));

    it('should open edit contractor modal', async(() => {
        const openEl: DebugElement = fixture.debugElement.query(By.css('#edit-contractor-button'));
        openEl.nativeElement.click();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const el = document.querySelector('body > ngb-modal-window > div > div > div.modal-header.bg-dark.update-contractor > h4');
            const text = el.textContent;

            expect(text).toBe('Обновить контрагента');
        });
    }));

    it('should create delete handler', () => {
        const closeEl: DebugElement = fixture.debugElement.query(By.css('#delete-contractor-button'));
        expect(closeEl.nativeElement).toBeTruthy();
    });
});
