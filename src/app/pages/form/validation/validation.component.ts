import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MustMatch } from './validation.mustmatch';
import { emailPattern, httpsPattern, numberPattern, regularExp, textPattern } from '@constants/regex';
import numbers from '@constants/numbers';

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
      firstName: ['', [Validators.required, Validators.pattern(textPattern)]],
      lastName: ['', [Validators.required, Validators.pattern(textPattern)]],
      userName: ['', [Validators.required, Validators.pattern(textPattern)]],
      city: ['', [Validators.required, Validators.pattern(textPattern)]],
      state: ['', [Validators.required, Validators.pattern(textPattern)]],
      zip: ['', [Validators.required, Validators.pattern(textPattern)]],
    });

    /**
     * Bootstrap tooltip validation form data
     */
    this.tooltipvalidationform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(textPattern)]],
      lastName: ['', [Validators.required, Validators.pattern(textPattern)]],
      userName: ['', [Validators.required, Validators.pattern(textPattern)]],
      city: ['', [Validators.required, Validators.pattern(textPattern)]],
      state: ['', [Validators.required, Validators.pattern(textPattern)]],
      zip: ['', [Validators.required, Validators.pattern(textPattern)]],
    });

    /**
     * Basic form validation
     */
    this.basicFormvalidation = this.formBuilder.group(
      {
        user: ['', [Validators.required, Validators.pattern(textPattern)]],
        email: ['', [Validators.required, Validators.pattern(emailPattern)]],
        password: ['', [Validators.required, Validators.minLength(numbers.six)]],
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
        email: ['', [Validators.required, Validators.pattern(emailPattern)]],
        password: ['', [Validators.required, Validators.minLength(numbers.six)]],
        url: ['', [Validators.required, Validators.pattern(httpsPattern)]],
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
        email: ['', [Validators.required, Validators.pattern(emailPattern)]],
        url: ['', [Validators.required, Validators.pattern(httpsPattern)]],
        digits: ['', [Validators.required, Validators.pattern(numberPattern)]],
        number: ['', [Validators.required, Validators.pattern(numberPattern)]],
        alphanum: ['', [Validators.required, Validators.pattern(textPattern)]],
        textarea: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(numbers.six)]],
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
      minlength: ['', [Validators.required, Validators.minLength(numbers.six)]],
      maxlength: ['', [Validators.required, Validators.maxLength(numbers.six)]],
      rangelength: ['', [Validators.required, Validators.minLength(numbers.five), Validators.maxLength(numbers.ten)]],
      minvalue: ['', [Validators.required, Validators.min(numbers.six)]],
      maxvalue: ['', [Validators.required, Validators.max(numbers.six)]],
      rangevalue: ['', [Validators.required, Validators.min(numbers.six), Validators.max(100)]],
      regularexp: ['', [Validators.required, Validators.pattern(regularExp)]],
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
