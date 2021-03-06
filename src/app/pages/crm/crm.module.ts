import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';

import { UIModule } from '@shared/ui/ui.module';
import {
  NgbAccordionModule,
  NgbAlertModule, NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbPopoverModule,
  NgbProgressbarModule, NgbTabsetModule,
  NgbTooltipModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { CRMRoutingModule } from './crm-routing.module';

import { UsersComponent } from './users/users.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { BurstNewsComponent } from './burst-news/burst-news.component';
import { NgxEditorModule } from 'ngx-editor';
import { ColorPickerModule } from 'ngx-color-picker';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxMaskModule } from 'ngx-mask';
import { NestableModule } from 'ngx-nestable';
import { SharedModule } from '@shared/shared.module';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { ClientsComponent } from '@pages/crm/clients/clients.component';
import { PublicationsComponent } from '@pages/crm/publications/publications.component';
import { HashtagsComponent } from '@pages/crm/hashtags/hashtags.component';

@NgModule({
  declarations: [
    ContractorsComponent,
    UsersComponent,
    BurstNewsComponent,
    ProjectsComponent,
    ClientsComponent,
    ReportsComponent,
    PublicationsComponent,
    HashtagsComponent
  ],
  imports: [
    FormsModule,
    UIModule,
    NgbModalModule,
    NgbPaginationModule,
    NgApexchartsModule,
    NgbTypeaheadModule,
    CRMRoutingModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    NgbAlertModule,
    CommonModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    NgxEditorModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    ColorPickerModule,
    UiSwitchModule,
    FileUploadModule,
    ArchwizardModule,
    NgxMaskModule.forRoot(),
    NestableModule,
    NgbPopoverModule,
    SharedModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbCollapseModule
  ]
})
export class CRMModule {
}
