import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ImagecropComponent} from './imagecrop/imagecrop.component';

const routes: Routes = [
    {
        path: 'image-crop',
        component: ImagecropComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule {}
