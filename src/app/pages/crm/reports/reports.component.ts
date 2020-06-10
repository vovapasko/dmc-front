import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectProjects } from '../../../core/store/selectors/news.selectors';
import { Subject } from 'rxjs';
import { ServerError } from '../../../core/models/responses/server/error';
import { IAppState } from '../../../core/store/state/app.state';
import { Router } from '@angular/router';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { GetProjects } from '../../../core/store/actions/news.actions';
import { Title } from '@angular/platform-browser';
import { GetNewsProjects } from '../../../core/store/actions/project.actions';
import { selectProjectsList } from '../../../core/store/selectors/project.selectors';
import { NewsProject } from '../../../core/models/instances/news-project';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  // bread crumb items
  title = 'Отчёты';
  breadCrumbItems: Array<{}>;
  projects$ = this.store.pipe(select(selectProjectsList));
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  term = '';

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private errorService: ErrorService,
    private loadingService: LoadingService,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.initBreadCrumbItems();
    this.initSubscriptions();
    this.setTitle(this.title);
    this._fetchData();
  }

  public initBreadCrumbItems(): void {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      { label: 'Отчёты', path: '/crm/reports' }
    ];
  }

  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Handle download
   */
  public onDownload(project: NewsProject): void {
    // TODO
  }

  /**
   * Handle upload
   */
  public onUpload(project: NewsProject): void {
    // TODO
  }

  /**
   * Handle download
   */
  public onDelete(project: NewsProject): void {
    // TODO
  }

  /**
   * fetches project value
   */
  public _fetchData() {
    this.store.dispatch(new GetNewsProjects());
  }
}
