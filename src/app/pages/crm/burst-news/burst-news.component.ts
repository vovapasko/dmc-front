import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { multipleRadialBars } from '../../../core/components/charts/data';
import { Steps } from '../../../core/constants/steps';
import { ChartType } from '../../dashboards/default/default.model';
import { revenueRadialChart } from '../../dashboards/default/data';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import {
  CreateProject,
  GetProject,
  GetProjectConfiguration,
  GetProjectSuccess,
  UpdateProject
} from '../../../core/store/actions/news.actions';
import { NewsService } from '../../../core/services/news.service';
import {
  selectCharacters,
  selectContractors,
  selectFormats,
  selectHashtags,
  selectMethods,
  selectProject
} from '../../../core/store/selectors/news.selectors';
import { Project } from '../../../core/models/instances/project';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import images from '../../../core/constants/images';
import { News } from '../../../core/models/instances/news';
import { AlifeFile } from '../../../core/models/instances/alife-file';
import { CreateProjectPayload } from '../../../core/models/payloads/news/project/create';
import { UpdateProjectPayload } from '../../../core/models/payloads/news/project/update';
import { ServerError } from '../../../core/models/responses/server/error';
import numbers from '../../../core/constants/numbers';
import { Title } from '@angular/platform-browser';
import { GetEmails, GetNewsProject, GetNewsProjects } from '../../../core/store/actions/project.actions';
import {
  selectEmailsList,
  selectNewsProject,
  selectProjectsList
} from '../../../core/store/selectors/project.selectors';
import { NewsProject } from '../../../core/models/instances/news-project';
import { GetNewsProjectPayload } from '../../../core/models/payloads/project/news-project/get';
import { Methods } from '../../../core/models/instances/method';

/**
 * Form Burst news component - handling the burst news with sidebar and content
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-burst-news',
  templateUrl: './burst-news.component.html',
  styleUrls: ['./burst-news.component.scss']
})
export class BurstNewsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  title = 'Разгон';
  breadCrumbItems: Array<{}>;
  contractors$ = this.store.pipe(select(selectContractors));
  hashtags$ = this.store.pipe(select(selectHashtags));
  formats$ = this.store.pipe(select(selectFormats));
  characters$ = this.store.pipe(select(selectCharacters));
  methods$ = this.store.pipe(select(selectMethods));
  newsProjects$ = this.store.pipe(select(selectProjectsList));
  newsSubmit = false;
  noImage = images.defaultImage;
  left = numbers.zero;
  step: Steps = numbers.zero;
  validationForm: FormGroup;
  editorForm: FormGroup;
  previewForm: FormGroup;
  newsForm: FormGroup;
  controls: FormArray;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  newsList = [new News('', '', [], [], '')];
  multipleRadialBars: ChartType = multipleRadialBars;
  methods = Methods;
  steps = { [this.methods.direct]: 2, [this.methods.bayer]: 1, [this.methods.topSecret]: 1 };
  revenueRadialChart: ChartType;
  blured = false;
  focused = false;
  submitted = false;
  projectId: number;
  submitForm: boolean;
  emails$ = this.store.pipe(select(selectEmailsList));

  // tslint:disable-next-line:max-line-length
  pairs = [{ key: 'clientName', value: 'client' }, {
    key: 'projectBudget',
    value: 'budget'
  }, { key: 'projectContractors', value: 'contractors' }, { key: 'projectHashtags', value: 'hashtags' }
  ];

  @ViewChild('wizardForm', { static: false }) wizard: BaseWizardComponent;
  @ViewChild('tpl', { static: false }) tpl;

  constructor(
    private vcr: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private errorService: ErrorService,
    private loadingService: LoadingService,
    private titleService: Title
  ) {
  }

  ngAfterViewInit() {
    this.vcr.createEmbeddedView(this.tpl);
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.initBreadCrumbs();
    this.initFormGroups();
    this.initSubscriptions();
    this.fetchData();
    this.setTitle(this.title);
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  public onChangeProject(newsProject: NewsProject): void {
    const payload = { id: newsProject.id } as GetNewsProjectPayload;
    const store = this.store;
    store.pipe(select(selectNewsProject)).subscribe(this.handleNewsProject.bind(this));
    store.dispatch(new GetNewsProject(payload));
  }

  public handleNewsProject(newsProject: NewsProject): void {
    if (newsProject) {
      const controls = this.validationForm.controls;
      const pairs = this.pairs;
      pairs.forEach(pair => controls[pair.key].setValue(newsProject[pair.value]));
      this.emails$ = of(newsProject.emails);
    }
  }

  public refreshContent(): void {

  }

  public processProject(project: Project): void {
    if (project) {
      const data = this.newsService.processProject(project, this.validationForm, this.editorForm);
      this.setProjectData(data);
    }
  }

  public setProjectData(data: { controls: FormArray, newsList: News[] }): void {
    if (data) {
      this.controls = data.controls;
      this.newsList = data.newsList;
    }
  }

  public getControl(index: number, field: string): FormControl {
    const controls = this.controls;
    if (field && controls) {
      return controls.at(index).get(field) as FormControl;
    }
    return null;
  }

  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
    this.submitForm = false;
    this.revenueRadialChart = revenueRadialChart;
    this.projectId = +this.route.snapshot.queryParamMap.get('id');
  }

  public initFormGroups(): void {
    this.initValidateForm();
    this.initEditorForm();
    this.initNewsForm();
    this.initControls();
    this.initPreviewForm();
  }

  public initPreviewForm(): void {
    this.previewForm = this.newsService.initializePreviewForm();
  }

  private initControls(): void {
    this.controls = this.newsService.initControls(this.newsList);
  }

  private initValidateForm(): void {
    this.validationForm = this.newsService.initializeValidationForm(this.budgetValidator.bind(this));
  }

  private initNewsForm(): void {
    this.newsForm = this.newsService.initializeNewsForm();
  }

  private initEditorForm(): void {
    this.editorForm = this.newsService.initializeEditorForm();
  }

  public initBreadCrumbs(): void {
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      {
        label: 'Разгон',
        path: '/burst-news',
        active: true
      }
    ];
  }

  public budgetValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const left = this.calculateLeft();
    return this.newsService.budgetValidate(left);
  }

  /**
   * Returns form
   */
  get form() {
    if (this.validationForm) {
      return this.validationForm.controls;
    }
  }

  get distributeForm() {
    if (this.newsForm) {
      return this.newsForm.controls;
    }
  }

  get editForm() {
    if (this.editorForm) {
      return this.editorForm.controls;
    }
  }

  public addNew(): void {
    this.addNewControl();
    this.addNewItem();
  }

  private addNewControl(): void {
    const controls = this.controls;
    this.controls = this.newsService.addNewControl(controls);
  }

  public addNewItem(): void {
    const newsList = this.newsList;
    this.newsList = this.newsService.addNewItem(newsList);
  }

  public calculateLeft(): number {
    this.left = this.newsService.calculateLeft(this.budget, this.validationForm);
    this.calculatePercentage();
    return this.left;
  }

  get budget() {
    if (this.form) {
      const budgetControl = this.form.projectBudget;
      return budgetControl ? budgetControl.value || 0 : 0;
    }
    return 0;
  }

  public calculatePercentage(): void {
    this.multipleRadialBars = this.newsService.calculatePercentage(this.left, this.budget);
  }

  /**
   * Go to next step while form value is valid
   */
  public formSubmit(): void {
    this.submitted = true;
  }

  public newsFormSubmit(): void {
    this.newsSubmit = true;
  }

  /**
   * Go to next step while second form value is valid
   */
  public profileFormSubmit(): void {
    this.submitForm = true;
  }

  public created(event): void {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event);
  }

  public changedEditor(event): void {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event);
  }

  public focus(value: boolean): void {
    this.focused = value;
  }

  public blur(value: boolean): void {
    this.blured = value;
  }

  public onEvent($event, focus: boolean): void {
    this.focus(focus);
    this.blur(!focus);
  }

  public onSubmit(): void {
    const projectId = this.projectId;
    const payload = this.newsService.onSubmit(this.validationForm, this.editorForm, this.newsList, !!projectId);
    this.submit(payload, projectId);
  }

  public submit(payload: CreateProjectPayload | UpdateProjectPayload, projectId): void {
    if (projectId) {
      payload.id = projectId;
      // @ts-ignore
      this.updateProject(payload);
    } else {
      this.createProject(payload);
    }
  }

  public previewFormSubmit(): void {

  }

  public createProject(payload: CreateProjectPayload): void {
    this.store.dispatch(new CreateProject(payload));
  }

  public updateProject(payload: UpdateProjectPayload): void {
    const store = this.store;
    store.dispatch(new UpdateProject(payload));
    store.dispatch(new GetProjectSuccess(null));
  }

  public onChange(files: Array<File>): void {
    console.log(files);
  }

  public updateField(index: number, field: string, value?: string | number | object): void {
    const control = this.getControl(index, field);
    this.newsList = this.newsService.updateField(index, field, value, control, this.newsList);
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  public fetchData(): void {
    const id = this.projectId;
    const store = this.store;
    store.dispatch(new GetProjectConfiguration());
    store.dispatch(new GetNewsProjects());
    store.dispatch(new GetEmails());
  }
}


