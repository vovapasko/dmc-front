import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { FileUploadModule } from '@iplab/ngx-file-upload';
import {NgbAlertModule, NgbPaginationModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { EcommercedashboardComponent } from './ecommercedashboard/ecommercedashboard.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [OrdersComponent, ProductsComponent, ProductdetailComponent, ProducteditComponent, EcommercedashboardComponent],
    imports: [
        CommonModule,
        FormsModule,
        EcommerceRoutingModule,
        UIModule,
        FileUploadModule,
        NgbPaginationModule,
        NgbProgressbarModule,
        NgApexchartsModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        NgbAlertModule,
        NgSelectModule,
        NgxMaskModule
    ]
})
export class EcommerceModule { }
