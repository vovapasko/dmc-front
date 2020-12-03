import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { selectHashtags } from '@store/selectors/news.selectors';
import { Router } from '@angular/router';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { Observable, Subject } from 'rxjs';
import { Orders } from '@constants/orders';
import { ServerError } from '@models/responses/server/error';
import { urls } from '@constants/urls';
import { GetProjectConfiguration } from '@store/actions/news.actions';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { ProjectService } from '@services/project.service';
import { selectUserList } from '@store/selectors/user.selectors';
import { GetUsers } from '@store/actions/user.actions';
import { selectContractorList } from '@store/selectors/contractor.selectors';
import { GetContractors } from '@store/actions/contractor.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  selectEmailsList,
  selectNewsProject, selectProjectNews,
  selectProjectsList
} from '@store/selectors/project.selectors';
import {
  CreateNewsProject,
  DeleteNewsProject,
  GetEmails,
  GetNewsProject,
  GetNewsProjects, GetNewsWaves,
  UpdateNewsProject
} from '@store/actions/project.actions';
import { CreateNewsProjectPayload } from '@models/payloads/project/news-project/create';
import { NewsProject } from '@models/instances/news-project';
import { UpdateNewsProjectPayload } from '@models/payloads/project/news-project/update';
import { breadCrumbs } from '@constants/bread-crumbs';
import { GetClients } from '@store/actions/client.actions';
import { selectClientList } from '@store/selectors/client.selectors';
import { Contractor } from '@models/instances/contractor';
import { NewsWavePrice } from '@models/instances/newsWavePrice';
import { NewsWaves } from '@models/instances/news-waves';
import { projectsTitle } from '@constants/titles';
import { burstMethods } from '@constants/methods';
import { newsProjectMatches, TicketService } from '@services/ticket.service';
import { TableData } from '@models/instances/tickets.model';

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
  methods = burstMethods;
  title = projectsTitle;
  breadCrumbItems: Array<{}>;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  orders = Orders;
  order = null;
  createProjectForm: FormGroup;
  editProjectForm: FormGroup;
  submitted = false;
  isCollapsed = false;
  clients$ = this.store.pipe(select(selectClientList));
  users$ = this.store.pipe(select(selectUserList));
  contractors$ = this.store.pipe(select(selectContractorList));
  projects$ = this.store.pipe(select(selectProjectsList));
  hashtags$ = this.store.pipe(select(selectHashtags));
  emails$ = this.store.pipe(select(selectEmailsList));
  news$ = this.store.pipe(select(selectProjectNews));
  project$ = this.store.pipe(select(selectNewsProject));
  tickets$: Observable<TableData[]>;
  projectId: number;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private errorService: ErrorService,
    private loadingService: LoadingService,
    private titleService: Title,
    private projectService: ProjectService,
    private modalService: NgbModal,
    public ticketService: TicketService
  ) {
  }

  ngOnInit() {
    this.ticketService.matches = newsProjectMatches;
    this.ticketService.records$ = this.projectService.newsProjects$;
    this.tickets$ = this.ticketService.tickets$;
    this.initBreadCrumbItems();
    this.initSubscriptions();
    this.setTitle(this.title);
    this.initForms();
    this._fetchData();
  }

  /**
   * Init forms, set form value
   */
  public initForms(): void {
    this.initCreateProjectForm();
    this.initEditProjectForm();
  }

  /**
   * Set create project form
   */
  public initCreateProjectForm(): void {
    this.createProjectForm = this.projectService.initializeCreateProjectForm();
  }

  /**
   * Set edit project form
   */
  public initEditProjectForm(project?: NewsProject): void {
    this.editProjectForm = this.projectService.initializeEditProjectForm(project);
  }

  get createProjectFormControls() {
    return this.createProjectForm.controls;
  }

  get editProjectFormControls() {
    return this.editProjectForm.controls;
  }

  /**
   * Handle creating new project
   */
  public addNewProject(): void {
    this.submitted = true;
    if (this.createProjectForm.invalid) {
      return;
    }
    const data = this.createProjectForm.value;
    const payload = { data } as unknown as CreateNewsProjectPayload;
    this.createNewsProject(payload);
    this.cleanAfter();
  }

  /**
   * Dispatch new project
   */
  public createNewsProject(payload: CreateNewsProjectPayload): void {
    this.store.dispatch(new CreateNewsProject(payload));
  }

  public loadNewsWaves(project: NewsProject): void {
    this.store.dispatch(new GetNewsWaves({ project: project.id }));
  }

  /**
   * Clean forms
   */
  public cleanAfter(): void {
    this.createProjectForm.reset();
    this.editProjectForm.reset();
    this.projectId = null;
    this.modalService.dismissAll();
    this.submitted = false;
  }

  /**
   * Set bread crumbs
   */
  public initBreadCrumbItems(): void {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.projects;
  }

  /**
   * Subscribe to subject
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  /**
   * Navigate to burst news page
   */
  public onCreateProject(): void {
    this.router.navigate([urls.CRM, urls.BURST_NEWS]);
  }

  public burstNews(news: NewsWaves): void {
    this.modalService.dismissAll();
    this.router.navigate([urls.CRM, urls.BURST_NEWS], { queryParams: { id: news.id } });
  }

  public selectProject(project: NewsProject): void {
    const payload = { id: project.id };
    this.projectId = project.id;
    this.store.dispatch(new GetNewsProject(payload));
  }

  /**
   * Fill edit project modal
   */
  public onChange(project: NewsProject): void {
    this.store.select(selectNewsProject).subscribe(this.initEditProjectForm.bind(this));
    this.selectProject(project);
  }

  public getContractorPrice(contractor: Contractor, format: string, priceList: NewsWavePrice[]): string | number {
    const changedContractor = priceList.find((el: NewsWavePrice) => el.contractor.id === contractor.id);
    return changedContractor ? changedContractor.price : contractor.postformatlistSet.find(el => el.postFormat === format).onePostPrice;
  }

  /**
   * Dispatch delete project
   */
  public onDelete(project: NewsProject): void {
    const payload = { id: project.id, data: {isArchived: true} };
    this.store.dispatch(new DeleteNewsProject(payload));
  }

  /**
   * Handle editing project
   */
  public editProject(): void {
    this.submitted = true;
    if (this.editProjectForm.invalid) {
      return;
    }
    const data = this.editProjectForm.value;
    const id = this.projectId;
    const payload = { id, data } as unknown as UpdateNewsProjectPayload;
    this.updateProject(payload);
    this.cleanAfter();
  }

  /**
   * Dispatch update project
   */
  public updateProject(payload: UpdateNewsProjectPayload): void {
    this.store.dispatch(new UpdateNewsProject(payload));
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Open "create new project" modal
   */
  public openModal(content: string, options: object = {}): void {
    this.modalService.open(content, { centered: true, ...options });
  }

  /**
   * fetches project value
   */
  public _fetchData(): void {
    const store = this.store;
    store.dispatch(new GetNewsProjects());
    store.dispatch(new GetClients());
    store.dispatch(new GetProjectConfiguration());
    store.dispatch(new GetUsers());
    store.dispatch(new GetContractors());
    store.dispatch(new GetEmails());
  }


}
