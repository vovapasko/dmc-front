import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardsModule } from './dashboards/dashboards.module';
import { ExtrasModule } from './extras/extras.module';
import { FormModule } from './form/form.module';
import { CRMModule } from './crm/crm.module';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbDropdownModule, DashboardsModule, ExtrasModule, FormModule, CRMModule, PagesRoutingModule],
})
export class PagesModule {}
