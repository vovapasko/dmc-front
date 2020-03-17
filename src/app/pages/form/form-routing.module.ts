import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WizardComponent } from './wizard/wizard.component';

const routes: Routes = [
    {
        path: '',
        component: WizardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule {}
