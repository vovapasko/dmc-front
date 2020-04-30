import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MustMatch } from './validation.mustmatch';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})

/**
 * form validation component - handling the form validation with sidebar and content
 */
export class ValidationComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  validationform: FormGroup; // bootstrap validation form
  tooltipvalidationform: FormGroup; // bootstrap tooltip validation form
  basicFormvalidation: FormGroup; // basic form validation
  horizontalFormValidation: FormGroup; // horizontal form validation

  typeValidationForm: FormGroup; // type validation form
  rangeValidationForm: FormGroup; // range validation form

  // Form submition
  submit: boolean;
  formsubmit: boolean;
  basicsubmit: boolean;
  typesubmit: boolean;
  rangesubmit: boolean;
  horizontalsubmit: boolean;
  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [
      { label: 'UBold', path: '/' },
      { label: 'Forms', path: '/' },
      { label: 'Form Validation', path: '/', active: true },
    ];
    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });

    /**
     * Bootstrap tooltip validation form data
     */
    this.tooltipvalidationform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });

    /**
     * Basic form validation
     */
    this.basicFormvalidation = this.formBuilder.group(
      {
        user: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpwd: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmpwd'),
      }
    );

    /**
     * Horizontal form validation
     */
    this.horizontalFormValidation = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        url: ['', [Validators.required, Validators.pattern('https?://.+')]],
        confirmpwd: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmpwd'),
      }
    );

    /**
     * Type validation form
     */
    this.typeValidationForm = this.formBuilder.group(
      {
        text: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
        url: ['', [Validators.required, Validators.pattern('https?://.+')]],
        digits: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        number: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        alphanum: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        textarea: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpwd: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmpwd'),
      }
    );

    /**
     * Range validation form
     */
    this.rangeValidationForm = this.formBuilder.group({
      minlength: ['', [Validators.required, Validators.minLength(6)]],
      maxlength: ['', [Validators.required, Validators.maxLength(6)]],
      rangelength: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      minvalue: ['', [Validators.required, Validators.min(6)]],
      maxvalue: ['', [Validators.required, Validators.max(6)]],
      rangevalue: ['', [Validators.required, Validators.min(6), Validators.max(100)]],
      regularexp: ['', [Validators.required, Validators.pattern('#[A-Fa-f0-9]{6}')]],
    });

    this.submit = false;
    this.formsubmit = false;
    this.basicsubmit = false;
    this.horizontalsubmit = false;
    this.typesubmit = false;
    this.rangesubmit = false;
  }

  /**
   * Returns form
   */
  get form() {
    return this.validationform.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
  }

  /**
   * returns tooltip validation form
   */
  get formData() {
    return this.tooltipvalidationform.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
  }

  /**
   * Returns the basic form
   */
  get basic() {
    return this.basicFormvalidation.controls;
  }

  /**
   * Basic validation form submit
   */
  basicSubmit() {
    this.basicsubmit = true;
  }

  /**
   * Returns the horizontal form
   */
  get horizontal() {
    return this.horizontalFormValidation.controls;
  }

  /**
   * Horizontal validation form submit
   */
  horizontalSubmit() {
    this.horizontalsubmit = true;
  }

  /**
   * Returns the type validation form
   */
  get type() {
    return this.typeValidationForm.controls;
  }

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
  }

  /**
   * Returns the range validation form
   */
  get range() {
    return this.rangeValidationForm.controls;
  }

  /**
   * range validation submit data
   */
  rangeSubmit() {
    this.rangesubmit = true;
  }
}
