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
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { burstSteps, h1, newsFieldReplacer, newsFields, newsFieldsHandler, p, template } from '@constants/news';
import { Email } from '@models/instances/email';
import { UpdateNewsWavesPayload } from '@models/payloads/news/news-waves/update';
import { CreateNewsWavesPayload } from '@models/payloads/news/news-waves/create';
import { NewsWaves } from '@models/instances/news-waves';
import { pairs } from '@constants/burst-news-pairs';
import { emptyNewsItem } from '@constants/empty-news-item';
import { breadCrumbs } from '@constants/bread-crumbs';
import { revenueRadialChart } from '@components/charts/data';
import { selectClientList } from '@store/selectors/client.selectors';
import { GetClients } from '@store/actions/client.actions';
import { convertFileToBase64, getColorByPercentage, saveFile, urltoFile } from '@helpers/utility';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contractor, PostFormatListSet } from '@models/instances/contractor';
import { NewsWavePrice } from '@models/instances/newsWavePrice';
import { ATTACHMENTS, TEXT } from '@constants/titles';
import { Attachment } from '@models/instances/attachment';
import { bytesToSize } from '@helpers/utility';
import { Format } from '@models/instances/format';

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
  clients$ = this.store.pipe(select(selectClientList));
  hashtags$ = this.store.pipe(select(selectHashtags));
  formats$ = this.store.pipe(select(selectFormats));
  characters$ = this.store.pipe(select(selectCharacters));
  methods$ = this.store.pipe(select(selectMethods));
  newsProjects$ = this.store.pipe(select(selectProjectsList));
  bytesToSize = bytesToSize;
  newsSubmit = false;
  newsProject: NewsProject;
  left = numbers.zero;
  step: Steps = numbers.zero;
  validationForm: FormGroup;
  editorForm: FormGroup;
  previewForm: FormGroup;
  newsForm: FormGroup;
  priceForm: FormGroup;
  controls: FormArray;
  priceControls: FormArray;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  newsList = [emptyNewsItem];
  priceList: PostFormatListSet[] = [];
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
  getColorByPercentage = getColorByPercentage;

  @ViewChild('wizardForm') wizard: BaseWizardComponent;
  @ViewChild('tpl') tpl;

  constructor(
    private vcr: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private errorService: ErrorService,
    private loadingService: LoadingService,
    private titleService: Title,
    private modalService: NgbModal
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
    controls.amount.setValue(newsProject.budget.amount);
    controls.amountCurrency.setValue(newsProject.budget.amountCurrency);
    this.emails$ = of(newsProject.emails);
    this.newsProject = newsProject;
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

  public initPriceControls(): void {
    // tslint:disable-next-line:max-line-length
    const list = this.commonFormControls.projectContractors.value.map((contractor: Contractor) => contractor.postformatlistSet).flat().filter((postformatList: PostFormatListSet) => this.commonFormControls.projectPostFormat.value.find((format: Format) => format.postFormat === postformatList.postFormat));
    const toGroups = list.map((entity: PostFormatListSet) => {
      return new FormGroup({
        inner: new FormControl(entity.onePostPrice.inner, Validators.required),
        innerCurrency: new FormControl(entity.onePostPrice.innerCurrency, Validators.required),
        outer: new FormControl(entity.onePostPrice.outer, Validators.required),
        outerCurrency: new FormControl(entity.onePostPrice.outerCurrency, Validators.required)
      });
    });
    this.priceControls = new FormArray(toGroups);
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

  public getPriceControl(index: number, field: string): FormControl {
    const controls = this.priceControls;
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
    this.initPriceForm();
  }

  public initPriceForm(): void {
    this.priceForm = new FormGroup({
      price: new FormControl(null, Validators.required)
    });
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
    // @ts-ignore
    this.validationForm = this.newsService.initializeValidationForm(this.budgetValidator.bind(this), !!this.route.queryParams._value.id);
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
  get commonFormControls() {
    if (!this.validationForm) {
      return;
    }
    return this.validationForm.controls;
  }

  /**
   * Returns controls for news form in distribution step
   */
  get distributeFormControls() {
    if (!this.newsForm) {
      return;
    }
    return this.newsForm.controls;
  }

  /**
   * Returns controls for news form in editor step
   */
  get editorFormControls() {
    if (!this.editorForm) {
      return;
    }
    return this.editorForm.controls;
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
   * Modal Open
   * @param content modal content
   */
  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
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
    if (!this.commonFormControls) {
      return 0;
    }
    const budgetControl = this.commonFormControls.projectBudget;
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
  public changedEditor(event, i): void {
    if (event.event !== 'text-change') {
      return;
    }
    // this.updateField(i, 'previewText');

    console.log(event);
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
    this.onChangeFormationText();
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
    // tslint:disable-next-line:max-line-length
    const {
      newsService,
      newsProject,
      validationForm,
      editorForm,
      newsForm,
      previewForm,
      newsList,
      newsWaveId,
      controls,
      newsWave,
      priceList
    } = this;
    // tslint:disable-next-line:max-line-length
    const payload = newsService.processNewsWavePayload(newsProject, validationForm, editorForm, newsForm, previewForm, newsList as unknown as News[], newsWaveId, controls, newsWave, this.priceControls);
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
    if (field === ATTACHMENTS) {
      this.onChangeFiles(control.value);
    }
    const previewControl = this.getControl(index, 'previewText');
    this.newsList = this.newsService.updateField(index, field, value, control, this.newsList);
    this.setContent(control, previewControl, field);
  }

  public onChangeFormationText(): void {
    if (!this.editorForm) {
      return;
    }
    const control = this.editorFormControls.text;
    const previewControl = this.previewFormControls.previewText;
    this.setContent(control, previewControl, TEXT);
  }

  public onChangeFormationFiles(event): void {
    const control = this.editorFormControls.attachments;
    const previewControl = this.previewFormControls.previewText;
    this.onChangeFiles(control.value);
    this.setContent(control, previewControl, ATTACHMENTS);
  }

  public onChangeFiles(files: Array<File>): void {
    // @ts-ignore
    files.forEach(file => convertFileToBase64(file));
  }

  /**
   * Collect all data in one content string value
   */
  public setContent(control: AbstractControl, previewControl: AbstractControl, field: string): void {
    this.setInfoContent(control, previewControl, field);
    // this.setImageContent(control, previewControl, field);
  }

  public setInfoContent(control: AbstractControl, previewControl: AbstractControl, field: string): void {
    if (field === ATTACHMENTS) {
      return;
    }
    const format = this.getProjectFormat();
    this.processContent(field, control, previewControl, format);
  }

  public processContent(field: string, control: AbstractControl, previewControl: AbstractControl, format: string): void {
    const handler = newsFieldsHandler[field];
    const replacer = newsFieldReplacer[field];
    const value = control.value;
    if (!value) {
      return;
    }
    const text = handler(value, format);
    const content = this.handlePreviewContent(previewControl.value);
    const replacedText = replacer(content, text);
    if (!replacedText) {
      return;
    }
    previewControl.setValue(replacedText);
  }

  public handlePreviewContent(value: string): string {
    if (!value) {
      return template;
    }
    if (value && (value.indexOf(h1) === -1 || value.indexOf(p) === -1)) {
      return template + value;
    }
    return value;
  }

  public getContractorPrice(contractor: Contractor, format: PostFormatListSet): string | number {
    // const changedContractor = this.priceList.find((el: NewsWavePrice) => el.contractor.id === contractor.id);
    // return changedContractor ? changedContractor.price : format.onePostPrice;
    return 1;
  }

  public setImageContent(control: AbstractControl, previewControl: AbstractControl, field: string): void {
    if (field !== ATTACHMENTS) {
      return;
    }
    const images = control.value.filter((file: File) => file.type.includes('image'));
    images.forEach((image: File) => this.handleImage(image, previewControl));
  }

  public handleImage(image: File, control: AbstractControl) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      if (control.value && control.value.includes(reader.result)) {
        return;
      }
      const text = control.value || '';
      const handledImage = newsFieldsHandler.image(reader.result) || '';
      control.setValue(text + handledImage);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  public onContentChanged(event: any): void {
    console.log(event);
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
    const value = `<p>${email.template}</p>` + control.value + `<br>` + `<p>${email.signature}</p>`;
    control.setValue(value);
  }

  /**
   * Get project format from validation form control
   */
  public getProjectFormat(): string {
    const form = this.commonFormControls;
    const projectFormat = form ? form.projectPostFormat : { value: {} };
    const value = projectFormat ? projectFormat.value : {};
    return value ? value.postFormat : '';
  }

  /**
   * Set page title
   */
  public setPrices(): void {
    // TODO
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
    // tslint:disable-next-line:max-line-length
    const {
      newsList,
      controls,
      priceList,
      priceControls
    } = newsService.setNewsWaveData(newsWave, validationForm, editorForm, newsForm, previewForm);
    this.newsList = newsList;
    this.controls = controls;
    this.priceList = priceList;
    this.priceControls = priceControls;
    this.newsWave = newsWave;
  }

  /**
   * Fetch all available data
   */
  public fetchData(): void {
    const store = this.store;
    const payload = { page: numbers.one };
    store.dispatch(new GetClients(payload));
    store.dispatch(new GetProjectConfiguration());
    store.dispatch(new GetNewsProjects(payload));
    store.dispatch(new GetEmails());
    this.processNewsWave();
  }

  public downloadAttachment(attachment: Attachment): void {
    urltoFile(attachment.base64, attachment.name, attachment.type)
      .then(file => {
        saveFile(file, attachment.name);
      });
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


