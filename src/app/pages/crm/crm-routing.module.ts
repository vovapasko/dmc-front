import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { BurstNewsComponent } from './burst-news/burst-news.component';
import { ProjectsComponent } from './projects/projects.component';
import { urls } from '@constants/urls';
import { ReportsComponent } from './reports/reports.component';
import { ClientsComponent } from '@pages/crm/clients/clients.component';
import { PublicationsComponent } from '@pages/crm/publications/publications.component';

const routes: Routes = [
  {
    path: urls.USERS,
    component: UsersComponent,
  },
  {
    path: urls.CONTRACTORS,
    component: ContractorsComponent,
  },
  {
    path: urls.BURST_NEWS,
    component: BurstNewsComponent,
  },
  {
    path: urls.PROJECTS,
    component: ProjectsComponent,
  },
  {
    path: urls.REPORTS,
    component: ReportsComponent,
  },
  {
    path: urls.CLIENTS,
    component: ClientsComponent,
  },
  {
    path: urls.PUBLICATIONS,
    component: PublicationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CRMRoutingModule {}
