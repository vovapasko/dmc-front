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
import {ContractorsComponent} from './contractors/contractors.component';

@NgModule({
  declarations: [ContractorsComponent, UsersComponent],
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
