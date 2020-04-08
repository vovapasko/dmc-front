import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Steps} from '../../../core/constants/steps';

import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';
import {ChartType} from '../../dashboards/default/default.model';
import {revenueRadialChart} from '../../dashboards/default/data';

@Component({
    selector: 'app-burst-news',
    templateUrl: './burst-news.component.html',
    styleUrls: ['./burst-news.component.scss']
})

/**
 * Form Burst news component - handling the burst news with sidebar and content
 */
export class BurstNewsComponent implements OnInit {

    // bread crumb items
    breadCrumbItems: Array<{}>;
    step: Steps = 0;
    steps = Steps;

    // validation form
    validationForm: FormGroup;
    profileValidationForm: FormGroup;

    nature = '';
    hashtag = '';
    format = '';
    method = '';
    contractor = '';

    revenueRadialChart: ChartType;


    submit: boolean;
    submitForm: boolean;
    @ViewChild('wizardForm', {static: false}) wizard: BaseWizardComponent;

    constructor(public formBuilder: FormBuilder) {
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
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', Validators.required],
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
        if (this.validationForm.valid) {
            this.wizard.navigation.goToNextStep();
        }
        this.step = 1;
        this.submit = true;
    }

    onChange(changes) {
        console.log(changes);
    }

    /**
     * Go to next step while second form value is valid
     */
    profileFormSubmit() {
        if (this.profileValidationForm.valid) {
            this.wizard.navigation.goToNextStep();
        }
        this.submitForm = true;
    }
}
