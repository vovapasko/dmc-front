import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ProjectStatusPipe } from './pipes/project-status.pipe';
import { ContractorsCostPipe } from './pipes/contractors-cost.pipe';
import { ContractorsNamesPipe } from './pipes/contractors-names.pipe';

@NgModule({
  declarations: [ProjectStatusPipe, ContractorsCostPipe, ContractorsNamesPipe],
  imports: [CommonModule, UIModule, AlifeFileToBase64Module],
  exports: [
    UIModule,
    ProjectStatusPipe,
    ContractorsCostPipe,
    ContractorsNamesPipe,
    AlifeFileToBase64Module,
  ],
})
export class SharedModule {}
