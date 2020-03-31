import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboards/dashboard', pathMatch: 'full'},
  { path: 'dashboard', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'crm', loadChildren: () => import('./crm/crm.module').then(m => m.CRMModule) },
  { path: 'image-crop', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'profile', loadChildren: () => import('./extras/extras.module').then(m => m.ExtrasModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
