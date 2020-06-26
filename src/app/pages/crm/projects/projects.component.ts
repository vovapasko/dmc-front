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
import {
  selectEmailsList,
  selectNewsProject,
  selectProjectsList
} from '../../../core/store/selectors/project.selectors';
import {
  CreateNewsProject, DeleteNewsProject,
  GetEmails,
  GetNewsProject,
  GetNewsProjects, UpdateNewsProject
} from '../../../core/store/actions/project.actions';
import { CreateNewsProjectPayload } from '../../../core/models/payloads/project/news-project/create';
import { NewsProject } from '../../../core/models/instances/news-project';
import { UpdateNewsProjectPayload } from '../../../core/models/payloads/project/news-project/update';

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
  editProjectForm: FormGroup;
  submitted = false;

  users$ = this.store.pipe(select(selectUserList));
  contractors$ = this.store.pipe(select(selectContractorList));
  projects$ = this.store.pipe(select(selectProjectsList));
  hashtags$ = this.store.pipe(select(selectHashtags));
  emails$ = this.store.pipe(select(selectEmailsList));
  projectId: number;

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
    this.initForms();
    this._fetchData();
  }

  public initForms(): void {
    this.initCreateProjectForm();
    this.initEditProjectForm();
  }

  public initCreateProjectForm(): void {
    this.createProjectForm = this.projectService.initializeCreateProjectForm();
  }

  public initEditProjectForm(project?: NewsProject): void {
    this.editProjectForm = this.projectService.initializeEditProjectForm(project);
  }

  get f () {
    return this.createProjectForm.controls;
  }

  public addNewProject(): void {
    const data = this.createProjectForm.value;
    const payload = {data} as unknown as CreateNewsProjectPayload;
    this.createNewsProject(payload);
    this.cleanAfter();
  }

  public createNewsProject(payload: CreateNewsProjectPayload): void {
    this.store.dispatch(new CreateNewsProject(payload));
  }

  public cleanAfter(): void {
    this.createProjectForm.reset();
    this.editProjectForm.reset();
    this.projectId = null;
    this.modalService.dismissAll();
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

  public onChange(id: number): void {
    const payload = {id};
    this.projectId = id;
    this.store.select(selectNewsProject).subscribe(this.initEditProjectForm.bind(this));
    this.store.dispatch(new GetNewsProject(payload));
  }

  public onDelete(id: number): void {
    const payload = {id};
    this.store.dispatch(new DeleteNewsProject(payload));
  }

  public editProject(): void {
    const data = this.editProjectForm.value;
    const id = this.projectId;
    const payload = {id, data} as unknown as UpdateNewsProjectPayload;
    this.updateProject(payload);
    this.cleanAfter();
  }

  public updateProject(payload: UpdateNewsProjectPayload): void {
    this.store.dispatch(new UpdateNewsProject(payload));
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
    store.dispatch(new GetNewsProjects());
    store.dispatch(new GetProjectConfiguration());
    store.dispatch(new GetUsers());
    store.dispatch(new GetContractors());
    store.dispatch(new GetEmails());
  }


}
