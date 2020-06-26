import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ServerError } from '@models/responses/server/error';
import { IAppState } from '@store/state/app.state';
import { Router } from '@angular/router';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { Title } from '@angular/platform-browser';
import { GetNewsProjects } from '@store/actions/project.actions';
import { selectProjectsList } from '@store/selectors/project.selectors';
import { NewsProject } from '@models/instances/news-project';
import { breadCrumbs } from '@constants/bread-crumbs';

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

  /**
   * Set bread crumbs in page
   */
  public initBreadCrumbItems(): void {
    this.breadCrumbItems = breadCrumbs.reports;
  }

  /**
   * Init loader and error subscriptions
   */
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
