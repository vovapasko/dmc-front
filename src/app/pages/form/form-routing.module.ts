import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WizardComponent } from './wizard/wizard.component';
import {ImagecropComponent} from './imagecrop/imagecrop.component';

const routes: Routes = [
    {
        path: 'burst-news',
        component: WizardComponent
    },
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
