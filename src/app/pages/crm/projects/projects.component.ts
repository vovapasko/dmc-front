import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { selectContractors, selectHashtags, selectProjects } from '../../../core/store/selectors/news.selectors';
import { Router } from '@angular/router';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { Subject } from 'rxjs';
import images from '../../../core/constants/images';
import { Orders } from '../../../core/constants/orders';
import { ServerError } from '../../../core/models/responses/server/error';
import { urls } from '../../../core/constants/urls';
import { GetProjectConfiguration, GetProjects } from '../../../core/store/actions/news.actions';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { selectUserList } from '../../../core/store/selectors/user.selectors';
import { GetUsers } from '../../../core/store/actions/user.actions';
import { selectContractorList } from '../../../core/store/selectors/contractor.selectors';
import { GetContractors } from '../../../core/store/actions/contractor.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  title = 'Проекты'
  breadCrumbItems: Array<{}>;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  noImage = images.defaultImage;
  orders = Orders;
  order = null;
  createProjectForm: FormGroup;
  submitted = false;

  users$ = this.store.pipe(select(selectUserList));
  contractors$ = this.store.pipe(select(selectContractorList));
  projects$ = this.store.pipe(select(selectProjects));
  hashtags$ = this.store.pipe(select(selectHashtags));

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private errorService: ErrorService,
    private loadingService: LoadingService,
    private titleService: Title,
    private projectService: ProjectService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.initBreadCrumbItems();
    this.initSubscriptions();
    this.setTitle(this.title);
    this.initCreateProjectForm();
    this._fetchData();
  }

  public initCreateProjectForm(): void {
    this.createProjectForm = this.projectService.initializeCreateProjectForm();
  }

  get f () {
    return this.createProjectForm.controls;
  }

  public addNewProject(): void {

  }

  public initBreadCrumbItems(): void {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      { label: 'Проекты', path: '/crm/projects' },
    ];
  }

  public initSubscriptions(): void {
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
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
  }

  /**
   * fetches project value
   */
  public _fetchData(): void {
    const store = this.store;
    // store.dispatch(new GetProjects());
    store.dispatch(new GetProjectConfiguration());
    store.dispatch(new GetUsers());
    store.dispatch(new GetContractors());
  }


}
