import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtrasRoutingModule } from './extras-routing.module';
import { UIModule } from '@shared/ui/ui.module';

import { NgbAlertModule, NgbProgressbarModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ExtrasRoutingModule,
    UIModule,
    NgbProgressbarModule,
    NgbTabsetModule,
    ReactiveFormsModule,
    NgbAlertModule,
    SharedModule,
  ],
})
export class ExtrasModule {}
