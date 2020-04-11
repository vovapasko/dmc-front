import {
    AfterViewChecked,
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Steps} from '../../../core/constants/steps';
import {EditorChangeContent, EditorChangeSelection} from 'ngx-quill';

import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';
import {ChartType} from '../../dashboards/default/default.model';
import {revenueRadialChart} from '../../dashboards/default/data';
import {NestableSettings} from 'ngx-nestable/lib/nestable.models';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-burst-news',
    templateUrl: './burst-news.component.html',
    styleUrls: ['./burst-news.component.scss']
})

/**
 * Form Burst news component - handling the burst news with sidebar and content
 */
export class BurstNewsComponent implements OnInit, AfterViewInit, AfterViewChecked {
    public list = [{id: 1}, {id: 11}];
    // bread crumb items
    breadCrumbItems: Array<{}>;
    step: Steps = 0;
    steps = Steps;

    // validation form
    validationForm: FormGroup;
    profileValidationForm: FormGroup;
    distributionForm: FormGroup;

    public options = {
        fixedDepth: true
    } as NestableSettings;

    cardData = [
        {
            title: true,
            image: 'assets/images/small/img-1.jpg',
            text: 'Some text',
            list: [{id: 7, title: 'lol Cras justo odio'}, {id: 8, title: 'kek Dapibus ac facilisis in'}],
            button: true
        },
        {
            title: true,
            image: 'assets/images/small/img-2.jpg',
            text: 'Some text',
            list: [{id: 6, title: 'test Cras justo odio'}, {id: 5, title: 'me Dapibus ac facilisis in'}],
            link: ['Card link', 'Another link']
        },
        {
            image: 'assets/images/small/img-3.jpg',
            text: 'Some text',
            list: [{id: 2, title: 'Cras justo odio'}, {id: 3, title: 'Dapibus ac facilisis in'}],
            button: true
        },
        {
            title: true,
            image: 'assets/images/small/img-4.jpg',
            text: 'Some text',
            list: [{id: 10, title: 'lul Cras justo odio'}, {id: 11, title: 'wow Dapibus ac facilisis in'}],
            button: true
        },
    ];

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
        private cdr: ChangeDetectorRef
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
        // tslint:disable-next-line: max-line-length
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'Forms', path: '/'}, {
            label: 'Form Wizard',
            path: '/',
            active: true
        }];

        /**
         * form value validation
         */
        this.validationForm = this.formBuilder.group({
            client: ['', Validators.required],
            project: ['', Validators.required],
            nature: ['', Validators.required],
            title: ['', Validators.required],
            hashtags: ['', Validators.required],
            format: ['', Validators.required],
            method: ['', Validators.required],
            budget: ['', Validators.required],
            contractors: ['', Validators.required],
        });

        /**
         * form value validation
         */
        this.profileValidationForm = this.formBuilder.group({
            editor: ['', Validators.required]
        });

        this.submit = false;
        this.submitForm = false;

        this.revenueRadialChart = revenueRadialChart;
    }

    enterStep(step) {
        console.log(step);
    }

    /**
     * Returns form
     */
    get form() {
        return this.validationForm.controls;
    }

    /**
     * Returns form
     */
    get profileForm() {
        return this.profileValidationForm.controls;
    }

    /**
     * Go to next step while form value is valid
     */
    formSubmit() {
        this.submit = true;
    }

    onChange(changes) {
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

    changedEditor(event: EditorChangeContent | EditorChangeSelection) {
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
}
