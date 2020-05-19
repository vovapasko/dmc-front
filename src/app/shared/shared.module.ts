import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ProjectStatusPipe } from './pipes/project-status.pipe';
import { ContractorsCostPipe } from './pipes/contractors-cost.pipe';
import { ContractorsNamesPipe } from './pipes/contractors-names.pipe';
import { EditModeDirective } from './directives/edit-mode.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditableOnEnterDirective } from './directives/editable-on-enter.directive';
import { EditableComponent } from '../core/components/editable/editable.component';

@NgModule({
  declarations: [ProjectStatusPipe, ContractorsCostPipe, ContractorsNamesPipe, EditModeDirective, ViewModeDirective, EditableOnEnterDirective, EditableComponent],
  imports: [CommonModule, UIModule, AlifeFileToBase64Module],
  exports: [
    UIModule,
    ProjectStatusPipe,
    ContractorsCostPipe,
    ContractorsNamesPipe,
    EditModeDirective,
    ViewModeDirective,
    EditableOnEnterDirective,
    EditableComponent,
    AlifeFileToBase64Module,
  ],
})
export class SharedModule {}
