import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { Error404Component } from './core/components/errors/error404/error404.component';
import { Error500Component } from './core/components/errors/error500/error500.component';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then((m) => m.AccountModule) },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
