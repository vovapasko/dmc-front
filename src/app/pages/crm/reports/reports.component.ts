import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectProjects } from '../../../core/store/selectors/news.selectors';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServerError } from '../../../core/models/responses/server/error';
import images from '../../../core/constants/images';
import { Orders } from '../../../core/constants/orders';
import { IAppState } from '../../../core/store/state/app.state';
import { Router } from '@angular/router';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { GetProjects } from '../../../core/store/actions/news.actions';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  projects$ = this.store.pipe(select(selectProjects));
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  term = '';

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private errorService: ErrorService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      { label: 'Отчёты', path: '/crm/reports' }
    ];
    this.initSubscriptions();
    this._fetchData();
  }

  private initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  /**
   * fetches project value
   */
  private _fetchData() {
    this.store.dispatch(new GetProjects());
  }
}