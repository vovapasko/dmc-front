import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtrasRoutingModule } from './extras-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import {NgbAlertModule, NgbProgressbarModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';

import { ProfileComponent } from './profile/profile.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ExtrasRoutingModule,
        UIModule,
        NgbProgressbarModule,
        NgbTabsetModule,
        LightboxModule,
        ReactiveFormsModule,
        NgbAlertModule
    ]
})
export class ExtrasModule { }
