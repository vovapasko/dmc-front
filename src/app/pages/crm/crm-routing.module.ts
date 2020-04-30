import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { BurstNewsComponent } from './burst-news/burst-news.component';
import { ProjectsComponent } from './projects/projects.component';
import { urls } from '../../core/constants/urls';
import { ReportsComponent } from './reports/reports.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CRMRoutingModule {}
