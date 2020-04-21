import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/state/app.state';
import {selectContractors, selectProjects} from '../../../core/store/selectors/news.selectors';
import {Router} from '@angular/router';
import {ErrorService} from '../../../core/services/error.service';
import {LoadingService} from '../../../core/services/loading.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})

/**
 * Projects component - handling the projects with sidebar and content
 */
export class ProjectsComponent implements OnInit {

    // bread crumb items
    breadCrumbItems: Array<{}>;
    projects$ = this.store.pipe(select(selectProjects));
    loading$: Subject<boolean>;
    error$: Subject<any>;

    order = null;

    constructor(
        private store: Store<IAppState>,
        private router: Router,
        private errorService: ErrorService,
        private loadingService: LoadingService,
    ) {
    }

    ngOnInit() {
        // tslint:disable-next-line: max-line-length
        this.breadCrumbItems = [{label: 'Главная', path: '/'}, {label: 'Проекты', path: '/crm/projects'}];

        /**
         * fetches data
         */
        this.initSubscriptions();
        this._fetchData();
    }

    initSubscriptions() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;

    }

    onCreateProject() {
        this.router.navigate(['crm', 'burst-news']);
    }

    onChange(id) {
        this.router.navigate(['crm', 'burst-news'], {queryParams: {id}});
    }

    /**
     * fetches project value
     */
    private _fetchData() {
        // this.store.dispatch(new GetProjects());
    }
}
