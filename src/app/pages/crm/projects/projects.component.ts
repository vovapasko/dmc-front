import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { selectProjects } from '../../../core/store/selectors/news.selectors';
import { Router } from '@angular/router';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { Subject } from 'rxjs';
import images from '../../../core/constants/images';
import { Orders } from '../../../core/constants/orders';
import { ServerError } from '../../../core/models/responses/server/error';
import { urls } from '../../../core/constants/urls';
import { GetProjects } from '../../../core/store/actions/news.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

/**
 * Projects component - handling the projects with sidebar and content
 */
export class ProjectsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  projects$ = this.store.pipe(select(selectProjects));
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  noImage = images.defaultImage;
  orders = Orders;
  order = null;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private errorService: ErrorService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      { label: 'Проекты', path: '/crm/projects' },
    ];
    this.initSubscriptions();
    this._fetchData();
  }

  private initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  public onCreateProject(): void {
    this.router.navigate([urls.CRM, urls.BURST_NEWS]);
  }

  public onChange(id): void {
    this.router.navigate([urls.CRM, urls.BURST_NEWS], { queryParams: { id } });
  }

  /**
   * fetches project value
   */
  private _fetchData() {
    this.store.dispatch(new GetProjects());
  }
}
