import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';

import { UIModule } from '../../shared/ui/ui.module';
import {NgbAlertModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { CRMRoutingModule } from './crm-routing.module';

import { UsersComponent } from './users/users.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { LeadsComponent } from './leads/leads.component';
import { CustomersComponent } from './customers/customers.component';
import { CrmdashboardComponent } from './crmdashboard/crmdashboard.component';
import {SellersComponent} from './sellers/sellers.component';

@NgModule({
  declarations: [SellersComponent, UsersComponent, OpportunitiesComponent, LeadsComponent, CustomersComponent, CrmdashboardComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UIModule,
        NgbModalModule,
        NgbPaginationModule,
        NgApexchartsModule,
        NgbTypeaheadModule,
        CRMRoutingModule,
        Ng2SearchPipeModule,
        NgSelectModule,
        NgbAlertModule
    ]
})
export class CRMModule { }
