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
import {GetProjectConfiguration} from '../../../core/store/actions/news.actions';
import {NewsService} from '../../../core/services/news.service';
import {
    selectCharacters,
    selectContractors,
    selectFormats,
    selectHashtags,
    selectMethods
} from '../../../core/store/selectors/news.selectors';
import {Contractor} from '../../../core/models/instances/contractor';
import {NotificationService} from '../../../core/services/notification.service';
import {NotificationType} from '../../../core/models/instances/notification';

import cloneDeep from 'lodash.clonedeep';
import {defaultNews} from "../../../core/constants/news";
import * as ts from "typescript/lib/tsserverlibrary";
import {Project} from "../../../core/models/instances/project";

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

    newsSubmit = false;

    total = 0;
    left = 0;

    step: Steps = 0;
    validationForm: FormGroup;
    editorForm: FormGroup;
    newsForm: FormGroup;
    controls: FormArray;

    public options = {
        fixedDepth: true
    } as NestableSettings;

    newsList = [cloneDeep(defaultNews)];

    revenueRadialChart: ChartType;
    blured = false;
    focused = false;
    submit: boolean;
    submitForm: boolean;

    @ViewChild('wizardForm', {static: false}) wizard: BaseWizardComponent;
    @ViewChild('tpl', {static: false}) tpl;

    constructor(
        public formBuilder: FormBuilder,
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private store: Store<IAppState>,
        private newsService: NewsService,
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
        this.submitForm = false;
        this.revenueRadialChart = revenueRadialChart;
        this.store.dispatch(new GetProjectConfiguration());
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
            label: 'Разгон новости',
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
            content: editor.editor,
            newsInProject,
            projectHashtags: common.hashtags
        };
        this.createProject(data);
    }

    createProject(data: Project) {
        console.log(data);
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
}
