import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellersComponent } from './sellers/sellers.component';

const routes: Routes = [
    {
        path: '',
        component: SellersComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
