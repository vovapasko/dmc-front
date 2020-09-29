import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxComponent } from './inbox/inbox.component';
import { ReademailComponent } from './reademail/reademail.component';
import { ComposeemailComponent } from './composeemail/composeemail.component';
import { OpportunitiesComponent } from '@pages/email/opportunities/opportunities.component';

const routes: Routes = [
  {
    path: '',
    component: OpportunitiesComponent
  },
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'read',
    component: ReademailComponent
  },
  {
    path: 'compose',
    component: ComposeemailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {
}
