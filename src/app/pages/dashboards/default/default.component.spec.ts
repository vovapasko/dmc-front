import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EcommerceComponent} from './ecommerce.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIModule} from '../../../shared/ui/ui.module';
import {
  NgbAlertModule, NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbPaginationModule, NgbProgressbarModule, NgbTooltipModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgSelectModule} from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {DashboardsRoutingModule} from '../dashboards-routing';
import {RouterTestingModule} from '@angular/router/testing';

describe('Dashboard', () => {
    let component: EcommerceComponent;
    let fixture: ComponentFixture<EcommerceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcommerceComponent],
            imports: [
              CommonModule,
              FormsModule,
              ReactiveFormsModule,
              NgbDropdownModule,
              NgbDatepickerModule,
              NgbProgressbarModule,
              NgbTooltipModule,
              NgApexchartsModule,
              ChartsModule,
              NgbCollapseModule,
              UIModule,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommerceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
