import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ProjectStatusPipe } from './pipes/project-status.pipe';
import { ContractorsCostPipe } from './pipes/contractors-cost.pipe';
import { ContractorsNamesPipe } from './pipes/contractors-names.pipe';
import { EditModeDirective } from './directives/edit-mode.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditableOnEnterDirective } from './directives/editable-on-enter.directive';
import { EditableComponent } from '@components/editable/editable.component';
import { ContractorsFormatsPipe } from './pipes/contractors-formats.pipe';
import { TicketsSortableDirective } from '@shared/directives/tickets-sortable.directive';
import { ContractorsArrangementPipe } from './pipes/contractors-arrangement.pipe';
import { ContractorsNewsAmountPipe } from './pipes/contractors-news-amount.pipe';
import { LabelFilterPipe } from './pipes/label-filter.pipe';
import { FromEmailPipe } from './pipes/from-email.pipe';

@NgModule({
  declarations: [
    ProjectStatusPipe,
    ContractorsCostPipe,
    ContractorsNamesPipe,
    EditModeDirective,
    ViewModeDirective,
    EditableOnEnterDirective,
    TicketsSortableDirective,
    EditableComponent,
    ContractorsFormatsPipe,
    ContractorsArrangementPipe,
    ContractorsNewsAmountPipe,
    LabelFilterPipe,
    FromEmailPipe,
  ],
  imports: [CommonModule, AlifeFileToBase64Module],
  exports: [
    ProjectStatusPipe,
    ContractorsCostPipe,
    ContractorsNamesPipe,
    ContractorsFormatsPipe,
    EditModeDirective,
    ViewModeDirective,
    EditableOnEnterDirective,
    TicketsSortableDirective,
    EditableComponent,
    AlifeFileToBase64Module,
    ContractorsArrangementPipe,
    ContractorsNewsAmountPipe,
    LabelFilterPipe,
    FromEmailPipe
  ]
})
export class SharedModule {
}
