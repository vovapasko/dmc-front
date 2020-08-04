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
import { ChartType, multipleRadialBars } from '@components/charts/data';
import { Steps } from '@constants/steps';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { CreateNewsWave, GetNewsWave, GetProjectConfiguration, UpdateNewsWave } from '@store/actions/news.actions';
import { NewsService } from '@services/news.service';
import {
  selectCharacters,
  selectContractors,
  selectFormats,
  selectHashtags,
  selectMethods,
  selectNewsWave
} from '@store/selectors/news.selectors';
import { Project } from '@models/instances/project';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { News } from '@models/instances/news';
import { ServerError } from '@models/responses/server/error';
import numbers from '../../../core/constants/numbers';
import { Title } from '@angular/platform-browser';
import { GetEmails, GetNewsProject, GetNewsProjects } from '@store/actions/project.actions';
import { selectEmailsList, selectNewsProject, selectProjectsList } from '@store/selectors/project.selectors';
import { NewsProject } from '@models/instances/news-project';
import { GetNewsProjectPayload } from '@models/payloads/project/news-project/get';
import { Methods } from '@models/instances/method';
import { separators } from '@constants/separators';
import { burstSteps, newsFields, newsFieldsHandler } from '@constants/news';
import { Email } from '@models/instances/email';
import { UpdateNewsWavesPayload } from '@models/payloads/news/news-waves/update';
import { CreateNewsWavesPayload } from '@models/payloads/news/news-waves/create';
import { NewsWaves } from '@models/instances/news-waves';
import { pairs } from '@constants/burst-news-pairs';
import { emptyNewsItem } from '@constants/empty-news-item';
import { breadCrumbs } from '@constants/bread-crumbs';
import {revenueRadialChart} from '@components/charts/data';

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
  newsProject: NewsProject;
  left = numbers.zero;
  step: Steps = numbers.zero;
  validationForm: FormGroup;
  editorForm: FormGroup;
  previewForm: FormGroup;
  newsForm: FormGroup;
  controls: FormArray;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  newsList = [emptyNewsItem];
  multipleRadialBars: ChartType = multipleRadialBars;
  methods = Methods;
  steps = burstSteps;
  revenueRadialChart: ChartType;
  blured = false;
  focused = false;
  submitted = false;
  newsWaveId: number;
  newsWave: NewsWaves;
  submitForm: boolean;
  emails$ = this.store.pipe(select(selectEmailsList));
  pairs = pairs;

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

  /**
   * Calls when select project in common step (validation form)
   * dispatch and process NewsProject
   */
  public onChangeProject(newsProject: NewsProject): void {
    const payload = { id: newsProject.id } as GetNewsProjectPayload;
    const store = this.store;
    store.pipe(select(selectNewsProject)).subscribe(this.handleNewsProject.bind(this));
    store.dispatch(new GetNewsProject(payload));
  }

  /**
   * Process news project, set values in validation form, set emails to select from project
   * and set project in this to process with it in create or update news-wave
   */
  public handleNewsProject(newsProject: NewsProject): void {
    if (!newsProject) {
      return;
    }
    const controls = this.validationForm.controls;
    this.pairs.forEach(pair => controls[pair.key].setValue(newsProject[pair.value]));
    this.emails$ = of(newsProject.emails);
    this.newsProject = newsProject;
  }


  /**
   * Refresh interactive counter data (pie chart with month, week, day, hour data)
   */
  public refreshContent(): void {
    // TODO
  }

  /**
   * Calls service handler which updates values in forms
   */
  public processProject(project: Project): void {
    if (!project) {
      return;
    }
    const data = this.newsService.processProject(project, this.validationForm, this.editorForm);
    this.setProjectData(data);
  }

  /**
   * Accepts controls and news list for distribution step
   */
  public setProjectData(data: { controls: FormArray, newsList: News[] }): void {
    if (!data) {
      return;
    }
    this.controls = data.controls;
    this.newsList = data.newsList;

  }

  /**
   * Returns control for input or select in form (distribution step or preview if direct method)
   */
  public getControl(index: number, field: string): FormControl {
    const controls = this.controls;
    if (field && controls) {
      return controls.at(index).get(field) as FormControl;
    }
    return null;
  }

  /**
   * Subscribe to updates in loading, error
   * set pie chart for interactive counter
   * gets id from url (burst-news?id=1)
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
    this.submitForm = false;
    this.revenueRadialChart = revenueRadialChart;
    this.newsWaveId = +this.route.snapshot.queryParamMap.get('id');
  }

  /**
   * Inits forms, form controls and other stuff
   */
  public initFormGroups(): void {
    this.initValidateForm();
    this.initEditorForm();
    this.initNewsForm();
    this.initControls();
    this.initPreviewForm();
  }

  /**
   * Accepts controls from service
   */
  public initPreviewForm(): void {
    this.previewForm = this.newsService.initializePreviewForm();
  }

  /**
   * Pass data for fill and accepts controls (distribution step, preview if direct)
   */
  private initControls(): void {
    this.controls = this.newsService.initControls(this.newsList);
  }

  /**
   * Accepts controls from service with custom validator for budget
   */
  private initValidateForm(): void {
    this.validationForm = this.newsService.initializeValidationForm(this.budgetValidator.bind(this));
  }

  /**
   * Accepts controls from service with custom validator for budget
   */
  private initNewsForm(): void {
    this.newsForm = this.newsService.initializeNewsForm();
  }

  /**
   * Accepts controls from service
   */
  private initEditorForm(): void {
    this.editorForm = this.newsService.initializeEditorForm();
  }

  /**
   * Set bread crumb for page
   */
  public initBreadCrumbs(): void {
    this.breadCrumbItems = breadCrumbs.burstNews;
  }

  /**
   * Returns error object for budget ( from service, service return error object {error: true} or null)
   */
  public budgetValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const left = this.calculateLeft();
    return this.newsService.budgetValidate(left);
  }

  /**
   * Returns controls for validation form in common step
   */
  get form() {
    if (!this.validationForm) {
      return;
    }
    return this.validationForm.controls;
  }

  /**
   * Returns controls for news form in distribution step
   */
  get distributeForm() {
    if (!this.newsForm) {
      return;
    }
    return this.newsForm.controls;
  }

  /**
   * Returns controls for preview form in preview step
   */
  get previewFormControls() {
    if (!this.previewForm) {
      return;
    }
    return this.previewForm.controls;
  }

  /**
   * Add new item in distribution step
   */
  public addNew(): void {
    this.addNewControl();
    this.addNewItem();
  }

  /**
   * Add new control to existing controls
   */
  private addNewControl(): void {
    const controls = this.controls;
    this.controls = this.newsService.addNewControl(controls);
  }

  /**
   * Add new item to existing items
   */
  public addNewItem(): void {
    const newsList = this.newsList;
    this.newsList = this.newsService.addNewItem(newsList);
  }

  /**
   * Calls service calculator and return left of budget
   */
  public calculateLeft(): number {
    this.left = this.newsService.calculateLeft(this.budget, this.validationForm);
    this.calculatePercentage();
    return this.left;
  }

  /**
   * Returns available (minus contractors cost) project budget
   */
  get budget() {
    if (!this.form) {
      return 0;
    }
    const budgetControl = this.form.projectBudget;
    return budgetControl ? budgetControl.value || 0 : 0;
  }

  /**
   * Sets percentages to pie chart
   */
  public calculatePercentage(): void {
    this.multipleRadialBars = this.newsService.calculatePercentage(this.left, this.budget);
  }

  /**
   * Go to next step while form value is valid
   */
  public formSubmit(): void {
    this.submitted = true;
  }

  /**
   * Trigger for validation forms
   */
  public newsFormSubmit(): void {
    this.newsSubmit = true;
  }

  /**
   * Go to next step while second form value is valid
   */
  public profileFormSubmit(): void {
    this.submitForm = true;
  }

  /**
   * Quill editor has been created
   */
  public created(event): void {
    // tslint:disable-next-line:no-console
    // console.log('editor-created', event);
  }

  /**
   * Quill editor has been updated (process only text change)
   */
  public changedEditor(event): void {
    // if (event.event !== 'text-change') {
    //   return;
    // }
    // const control = this.previewFormControls.previewText;
    // control.setValue(event.html);
  }


  /**
   * Quill editor has been focues
   */
  public focus(value: boolean): void {
    this.focused = value;
  }

  /**
   * Quill editor has been blured
   */
  public blur(value: boolean): void {
    this.blured = value;
  }

  /**
   * Quill editor has been triggered
   */
  public onEvent($event, focus: boolean): void {
    this.focus(focus);
    this.blur(!focus);
  }

  /**
   * Submit or confirm button has been pressed
   */
  public onSubmit(): void {
    const { newsService, newsProject, validationForm, editorForm, newsForm, previewForm, newsList, newsWaveId, controls, newsWave } = this;
    // tslint:disable-next-line:max-line-length
    const payload = newsService.processNewsWavePayload(newsProject, validationForm, editorForm, newsForm, previewForm, newsList as unknown as News[], newsWaveId, controls, newsWave);
    this.submit(payload, newsWaveId);
  }

  /**
   * Process update or create news-wave
   */
  public submit(payload: UpdateNewsWavesPayload | CreateNewsWavesPayload, newsWaveId?: number): void {
    if (newsWaveId) {
      this.updateNewsWave(payload as unknown as UpdateNewsWavesPayload);
    } else {
      this.createNewsWave(payload as unknown as CreateNewsWavesPayload);
    }
  }

  /**
   * Calls when preview form has been submitted
   */
  public previewFormSubmit(): void {
    // TODO
  }

  /**
   * Dispatch update news wave with update news wave payload
   */
  public updateNewsWave(payload: UpdateNewsWavesPayload): void {
    this.store.dispatch(new UpdateNewsWave(payload));
  }

  /**
   * Dispatch create news wave with create news wave payload
   */
  public createNewsWave(payload: CreateNewsWavesPayload): void {
    this.store.dispatch(new CreateNewsWave(payload));
  }

  /**
   * Update news list item by id and field and smth with new inline value
   */
  public updateField(index: number, field: string, value?: string | number | object): void {
    const control = this.getControl(index, field);
    this.newsList = this.newsService.updateField(index, field, value, control, this.newsList);
    this.updatePreviewText(index, control);
    if (field === 'attachments') {
      this.onChangeDistributionFiles(control);
    }
  }

  public onChangeDistributionFiles(control: FormControl) {
    // console.log(control);
  }

  public onChangeFormationFiles(event): void {
    // console.log(event);
  }

  /**
   * Process update preview text in last step
   */
  public updatePreviewText(index: number, control: FormControl): void {
    const previewControl = this.getControl(index, 'previewText');
    const content = this.getContent(index);
    previewControl.setValue(content);
  }

  /**
   * Collect all data in one content string value
   */
  public getContent(index: number): string {
    const fields = Object.keys(newsFields);
    const format = this.getProjectFormat();
    let content = '';
    fields.forEach(field => {
      const handler = newsFieldsHandler[field];
      const processingControl = this.getControl(index, field);
      const value = processingControl.value;
      content += handler(value, format) + separators.newLine;
    });
    return content;
  }

  /**
   * Email select in preview step handler
   */
  public onChangeEmail(email: Email): void {
    this.updatePreviewEmail(email);
    this.updatePreviewEmails(email);
  }

  /**
   * Add additional text(template, signature) to preview content from distribution form
   */
  public updatePreviewEmails(email: Email): void {
    this.newsList.forEach((el, index) => {
      const control = this.getControl(index, 'previewText');
      this.setEmailValue(control, email);
    });
  }

  /**
   * Add additional text(template, signature) to preview content from formation form
   */
  public updatePreviewEmail(email: Email): void {
    const control = this.previewFormControls.previewText;
    this.setEmailValue(control, email);
  }

  /**
   * Set value in field
   */
  public setEmailValue(control: FormControl | AbstractControl, email: Email) {
    const value = `<p>${email.template}</p>` + control.value + `<p>${email.signature}</p>`;
    control.setValue(value);
  }

  /**
   * Get project format from validation form control
   */
  public getProjectFormat(): string {
    const form = this.form;
    const projectFormat = form ? form.projectPostFormat : { value: {} };
    const value = projectFormat ? projectFormat.value : {};
    return value ? value.postFormat : '';
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }


  /**
   * Handle delete news
   */
  public onDeleteNews(index: number): void {
    this.newsList.splice(index, 1);
  }

  /**
   * Process news wave loaded from api, and set values from news wave to controls and form
   */
  public handleNewsWave(newsWave: NewsWaves): void {
    if (!newsWave) {
      return;
    }
    const { newsService, validationForm, editorForm, newsForm, previewForm } = this;
    this.onChangeProject(newsWave.project);
    const { newsList, controls } = newsService.setNewsWaveData(newsWave, validationForm, editorForm, newsForm, previewForm);
    this.newsList = newsList;
    this.controls = controls;
    this.newsWave = newsWave;
  }

  /**
   * Fetch all available data
   */
  public fetchData(): void {
    const store = this.store;
    store.dispatch(new GetProjectConfiguration());
    store.dispatch(new GetNewsProjects());
    store.dispatch(new GetEmails());
    this.processNewsWave();
  }


  /**
   * Fetch news wave if news wave id
   */
  public processNewsWave() {
    const { store, newsWaveId } = this;
    if (!newsWaveId) {
      return;
    }
    store.pipe(select(selectNewsWave)).subscribe(this.handleNewsWave.bind(this));
    store.dispatch(new GetNewsWave({ id: newsWaveId }));
  }
}


