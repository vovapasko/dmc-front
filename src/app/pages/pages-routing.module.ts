import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/dashboards/dashboard', pathMatch: 'full'},
  { path: 'dashboard', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'users', loadChildren: () => import('./crm/crm.module').then(m => m.CRMModule) },
  { path: 'counterparties', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'burst-news', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'bursted-news', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'reports', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'profile', loadChildren: () => import('./extras/extras.module').then(m => m.ExtrasModule) },
  { path: 'lock-screen', loadChildren: () => import('./extras/extras.module').then(m => m.ExtrasModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
