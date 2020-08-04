import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: 'crm', loadChildren: () => import('./crm/crm.module').then((m) => m.CRMModule) },
  { path: 'profile', loadChildren: () => import('./extras/extras.module').then((m) => m.ExtrasModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
