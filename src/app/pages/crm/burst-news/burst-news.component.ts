import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';

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

    // validation form
    validationForm: FormGroup;
    profileValidationForm: FormGroup;

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
            userName: ['', Validators.required],
            password: ['', Validators.required],
            confirm: ['', Validators.required],
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
        this.submit = true;
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