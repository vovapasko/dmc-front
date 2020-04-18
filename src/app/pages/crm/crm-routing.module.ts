import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsersComponent} from './users/users.component';
import {ContractorsComponent} from './contractors/contractors.component';
import {BurstNewsComponent} from './burst-news/burst-news.component';
import {ProjectsComponent} from './projects/projects.component';

const routes: Routes = [
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'contractors',
        component: ContractorsComponent
    },
    {
        path: 'burst-news',
        component: BurstNewsComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CRMRoutingModule {
}
