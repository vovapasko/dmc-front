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
import {Contractor} from '../../../core/models/instances/contractor';
import {NotificationService} from '../../../core/services/notification.service';
import {NotificationType} from '../../../core/models/instances/notification';

import cloneDeep from 'lodash.clonedeep';
import {defaultNews} from '../../../core/constants/news';
import * as ts from 'typescript/lib/tsserverlibrary';
import {Project} from '../../../core/models/instances/project';
import {ActivatedRoute, Params} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {ErrorService} from "../../../core/services/error.service";
import {LoadingService} from "../../../core/services/loading.service";

//{
//   "id": 3,
//   "newsCharacter": {
//     "id": 1,
//     "character": "standard"
//   },
//   "projectPostFormat": {
//     "id": 1,
//     "postFormat": "news"
//   },
//   "projectBurstMethod": {
//     "id": 1,
//     "method": "direct"
//   },
//   "content": {
//     "id": 3,
//     "text": "<p>content</p>"
//   },
//   "projectContractors": [
//     {
//       "id": 1,
//       "editorName": "Editor 1",
//       "contactPerson": "Contact 1",
//       "phoneNumber": "Number 1",
//       "email": "contractor@contr.com",
//       "newsAmount": 50,
//       "arrangedNews": 20,
//       "onePostPrice": 140,
//       "dateCreated": "2020-04-17T14:24:19.543642Z",
//       "dateUpdated": "2020-04-17T14:24:19.543938Z"
//     },
//     {
//       "id": 2,
//       "editorName": "Editor 2",
//       "contactPerson": "Contact 2",
//       "phoneNumber": "Number 2",
//       "email": "contractor2@contr.com",
//       "newsAmount": 50,
//       "arrangedNews": 20,
//       "onePostPrice": 140,
//       "dateCreated": "2020-04-17T14:24:19.647988Z",
//       "dateUpdated": "2020-04-17T14:24:19.648300Z"
//     },
//     {
//       "id": 3,
//       "editorName": "Editor 3",
//       "contactPerson": "Contact 3",
//       "phoneNumber": "Number 3",
//       "email": "contractor3@contr.com",
//       "newsAmount": 50,
//       "arrangedNews": 20,
//       "onePostPrice": 140,
//       "dateCreated": "2020-04-17T14:24:19.736664Z",
//       "dateUpdated": "2020-04-17T14:24:19.737475Z"
//     }
//   ],
//   "projectHashtags": [
//     {
//       "id": 1,
//       "name": "mytag1"
//     },
//     {
//       "id": 2,
//       "name": "mytag2"
//     },
//     {
//       "id": 3,
//       "name": "mytag3"
//     }
//   ],
//   "newsInProject": [
//     {
//       "title": "title"
//     }
//   ],
//   "clientName": "client",
//   "projectName": "project",
//   "projectTitle": "title",
//   "projectBudget": 1000,
//   "isConfirmed": false,
//   "progress": 0,
//   "dateCreated": "2020-04-18T12:28:44.175240Z",
//   "dateUpdated": "2020-04-18T12:28:44.175454Z"
// }

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
    submit: boolean;
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
        if (!project) {
            return;
        }
        const common = this.validationForm.controls;
        const editor = this.editorForm.controls;
        const newsList = project.newsInProject.map(el => ({image: {base64: el.image}}));
        common.nature.setValue(project.newsCharacter);
        common.format.setValue(project.projectPostFormat);
        common.method.setValue(project.projectBurstMethod);
        common.client.setValue(project.clientName);
        common.project.setValue(project.projectName);
        common.title.setValue(project.projectTitle);
        common.budget.setValue(project.projectBudget);
        common.contractors.setValue(project.projectContractors);
        common.hashtags.setValue(project.projectHashtags);
        editor.editor.setValue(project.content.text);
        const toGroups = this.newsList.map(entity => {
            return new FormGroup({
                title: new FormControl(entity.title, Validators.required),
                image: new FormControl(entity.image.base64, Validators.required),
                contractors: new FormControl(entity.contractors, Validators.required)
            });
        });
        this.controls = new FormArray(toGroups);
        this.newsList = newsList;
        console.log(project);
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
        this.submit = false;
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
        const toGroups = this.newsList.map(entity => {
            return new FormGroup({
                title: new FormControl(null, Validators.required),
                image: new FormControl(null, Validators.required),
                contractors: new FormControl(null, Validators.required)
            });
        });
        this.controls = new FormArray(toGroups);
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
        if (left < 0) {
            this.notificationService.notify(NotificationType.warning, 'Внимание', `Вы превысили бюджет на ${left * -1}`, 3500);
            return {budget: true};
        }
        return null;
    }

    /**
     * Returns form
     */
    get form() {
        return this.validationForm.controls;
    }

    get distributeForm() {
        return this.newsForm.controls;
    }

    addNew() {
        this.addNewControl();
        this.addNewItem();
    }

    addNewControl() {
        const newControls = new FormGroup({
            title: new FormControl(null, Validators.required),
            image: new FormControl(null, Validators.required),
            contractors: new FormControl(null, Validators.required)
        });
        this.controls.push(newControls);
    }

    addNewItem() {
        const newsList = this.newsList.slice();
        newsList.push(cloneDeep(defaultNews));
        this.newsList = newsList;
    }

    calculateLeft() {
        if (this.validationForm) {
            const contractorsControl = (this.form.contractors as unknown as Contractor[]);
            // @ts-ignore
            const contractors = contractorsControl ? (contractorsControl.value || []) : [];
            const left = this.budget - contractors.reduce((a, c) => a + +c.onePostPrice, 0);
            this.calculatePercentage(left);
            return left;
        }
        return null;
    }

    get budget() {
        const budgetControl = this.form.budget;
        return budgetControl ? (budgetControl.value || 0) : 0;
    }

    calculatePercentage(left) {
        // tslint:disable-next-line:no-bitwise
        const percent = ~~(left / this.budget * 100);
        const revenue = Object.assign({}, revenueRadialChart);
        revenue.series = [percent];
        this.revenueRadialChart = revenue;
        this.left = left;
    }

    /**
     * Go to next step while form value is valid
     */
    formSubmit() {
        this.submit = true;
    }

    newsFormSubmit() {
        this.newsSubmit = true;
    }

    onChange(changes) {
        console.log(changes);
    }

    onDrop(changes) {
        console.log(changes);
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
        const image = this.newsList[index].image;
        if (onFile) {
            image.file = files[0];
        } else {
            image.base64 = files[0].base64;
        }
        this.updateField(index, 'image', image);
    }

    onSubmit() {
        const common = this.validationForm.value;
        const editor = this.editorForm.value;
        const newsInProject = this.newsList.map(el => ({...el, image: el.image.file}));
        const data = {
            newsCharacter: common.nature,
            projectPostFormat: common.format,
            projectBurstMethod: common.method,
            clientName: common.client,
            projectName: common.project,
            projectTitle: common.title,
            projectBudget: common.budget,
            projectContractors: common.contractors,
            content: {text: editor.editor},
            isConfirmed: false,
            newsInProject,
            projectHashtags: common.hashtags,
        };
        const projectId = this.projectId;
        if (projectId) {
            data.isConfirmed = true;
            this.updateProject(data, projectId);
            return;
        }
        this.createProject(data);
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
        if (control.valid) {
            this.newsList = this.newsList.map((e, i) => {
                if (index === i) {
                    return {
                        ...e,
                        [field]: value || control.value
                    };
                }
                return e;
            });
        }
    }

    fetchData() {
        const id = this.projectId;
        if (id) {
            this.store.select(selectProject).subscribe(this.processProject.bind(this));
            this.store.dispatch(new GetProject({id}));
        }
    }
}
