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
import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NestableSettings} from 'ngx-nestable/lib/nestable.models';

import {Steps} from '../../../core/constants/steps';
import {ChartType} from '../../dashboards/default/default.model';
import {revenueRadialChart} from '../../dashboards/default/data';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/state/app.state';
import {
    CreateProject,
    GetProject,
    GetProjectConfiguration, GetProjectSuccess,
    UpdateProject
} from '../../../core/store/actions/news.actions';
import {NewsService} from '../../../core/services/news.service';
import {
    selectCharacters,
    selectContractors,
    selectFormats,
    selectHashtags,
    selectMethods, selectProject
} from '../../../core/store/selectors/news.selectors';
import {NotificationService} from '../../../core/services/notification.service';
import cloneDeep from 'lodash.clonedeep';
import {defaultNews} from '../../../core/constants/news';
import {Project} from '../../../core/models/instances/project';
import {ActivatedRoute, Params} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {ErrorService} from '../../../core/services/error.service';
import {LoadingService} from '../../../core/services/loading.service';

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

    list = [{id: 1}, {id: 11}];
    breadCrumbItems: Array<{}>;

    contractors$ = this.store.pipe(select(selectContractors));
    hashtags$ = this.store.pipe(select(selectHashtags));
    formats$ = this.store.pipe(select(selectFormats));
    characters$ = this.store.pipe(select(selectCharacters));
    methods$ = this.store.pipe(select(selectMethods));
    project$ = this.store.pipe(select(selectProject));

    newsSubmit = false;

    total = 0;
    left = 0;

    step: Steps = 0;
    validationForm: FormGroup;
    editorForm: FormGroup;
    newsForm: FormGroup;
    controls: FormArray;


    loading$: Subject<boolean>;
    error$: Subject<any>;


    public options = {
        fixedDepth: true
    } as NestableSettings;

    newsList = [cloneDeep(defaultNews)];

    revenueRadialChart: ChartType;
    blured = false;
    focused = false;
    submitted = false;
    projectId: number;
    submitForm: boolean;

    @ViewChild('wizardForm', {static: false}) wizard: BaseWizardComponent;
    @ViewChild('tpl', {static: false}) tpl;

    constructor(
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private store: Store<IAppState>,
        private route: ActivatedRoute,
        private newsService: NewsService,
        private errorService: ErrorService,
        private loadingService: LoadingService,
        private notificationService: NotificationService
    ) {
    }

    ngAfterViewInit() {
        this.vcr.createEmbeddedView(this.tpl);
        this.cdr.detectChanges();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    processProject(project: Project) {
        const data = this.newsService
            .processProject(
                project,
                this.validationForm,
                this.editorForm
            );
        this.setProjectData(data);
    }

    setProjectData(data) {
        if (data) {
            this.controls = data.controls;
            this.newsList = data.newsList;
        }
    }

    ngOnInit() {
        this.initBreadCrumbs();
        this.initForms();
        this.initSubscriptions();
    }

    getControl(index: number, field: string): FormControl {
        return this.controls.at(index).get(field) as FormControl;
    }

    initSubscriptions() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;
        this.submitForm = false;
        this.revenueRadialChart = revenueRadialChart;
        this.store.dispatch(new GetProjectConfiguration());
        this.projectId = +this.route.snapshot.queryParamMap.get('id');
        this.fetchData();
    }

    initForms() {
        this.initValidateForm();
        this.initEditorForm();
        this.initNewsForm();
        this.initControls();
    }

    initControls() {
        this.controls = this.newsService.initControls(this.newsList);
    }

    initValidateForm() {
        this.validationForm = this.newsService.initializeValidationForm(this.budgetValidator.bind(this));
    }

    initNewsForm() {
        this.newsForm = this.newsService.initializeNewsForm();
    }

    initEditorForm() {
        this.editorForm = this.newsService.initializeEditorForm();
    }

    initBreadCrumbs() {
        this.breadCrumbItems = [{label: 'Главная', path: '/'}, {
            label: 'Разгон',
            path: '/burst-news',
            active: true
        }];
    }

    budgetValidator(control: AbstractControl): { [key: string]: boolean } | null {
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

    addNew() {
        this.addNewControl();
        this.addNewItem();
    }

    addNewControl() {
        const controls = this.controls;
        this.controls = this.newsService.addNewControl(controls);
    }

    addNewItem() {
        const newsList = this.newsList;
        this.newsList = this.newsService.addNewItem(newsList);
    }

    calculateLeft() {
        this.left = this.newsService.calculateLeft(this.budget, this.validationForm);
        this.calculatePercentage();
    }

    get budget() {
        if (this.form) {
            const budgetControl = this.form.projectBudget;
            return budgetControl ? (budgetControl.value || 0) : 0;
        }
        return 0;
    }

    calculatePercentage() {
        this.revenueRadialChart = this.newsService.calculatePercentage(this.left, this.budget);
    }

    /**
     * Go to next step while form value is valid
     */
    formSubmit() {
        this.submitted = true;
    }

    newsFormSubmit() {
        this.newsSubmit = true;
    }

    /**
     * Go to next step while second form value is valid
     */
    profileFormSubmit() {
        this.submitForm = true;
    }

    created(event) {
        // tslint:disable-next-line:no-console
        console.log('editor-created', event);
    }

    changedEditor(event) {
        // tslint:disable-next-line:no-console
        console.log('editor-change', event);
    }

    focus($event) {
        // tslint:disable-next-line:no-console
        console.log('focus', $event);
        this.focused = true;
        this.blured = false;
    }

    blur($event) {
        // tslint:disable-next-line:no-console
        console.log('blur', $event);
        this.focused = false;
        this.blured = true;
    }

    onImageChange(files, index, onFile?: boolean) {
        const newsList = this.newsList;
        const image = this.newsService.onImageChange(files, index, onFile, newsList);
        this.updateField(index, 'image', image);
    }

    onSubmit() {
        const projectId = this.projectId;
        const data = this.newsService.onSubmit(this.validationForm, this.editorForm, this.newsList, !!projectId);
        this.submit(data, projectId);
    }

    submit(data, projectId) {
        if (projectId) {
            this.updateProject(data, projectId);
        } else {
            this.createProject(data);
        }
    }

    createProject(data: Project) {
        this.store.dispatch(new CreateProject({data}));
    }

    updateProject(data: Project, projectId) {
        this.store.dispatch(new UpdateProject({id: projectId, data}));
        this.store.dispatch(new GetProjectSuccess(null));
    }

    updateField(index: number, field: string, value?: any) {
        const control = this.getControl(index, field);
        this.newsList = this.newsService.updateField(index, field, value, control, this.newsList);
    }

    fetchData() {
        const id = this.projectId;
        if (id) {
            this.store.select(selectProject).subscribe(this.processProject.bind(this));
            this.store.dispatch(new GetProject({id}));
        }
    }
}
