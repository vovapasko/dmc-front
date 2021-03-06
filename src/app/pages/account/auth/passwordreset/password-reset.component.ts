import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';

import { MustMatch } from '@pages/form/validation/validation.mustmatch';
import { UserService } from '@services/user.service';
import { PasswordResetConfirm } from '@store/actions/user.actions';
import { IAppState } from '@store/state/app.state';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { setAuthClasses } from '@helpers/utility';
import { ConfirmResetPasswordPayload } from '@models/payloads/user/confirm-reset-password';
import { ServerError } from '@models/responses/server/error';
import numbers from '@constants/numbers';
import { RESET_PASSWORD } from '@constants/titles';
import { DateService } from '@services/date.service';

/**
 * This component for change user password
 */

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, AfterViewInit, OnDestroy {
  routeSubscription: Subscription;
  confirm = '';
  title = RESET_PASSWORD;
  resetForm: FormGroup;
  submitted = false;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  success = '';
  visible = false;
  currentYear: number;
  startYear: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private userService: UserService,
    private store: Store<IAppState>,
    private errorService: ErrorService,
    private loadingService: LoadingService,
    private dateService: DateService
  ) {
  }

  ngOnInit() {
    this.initSubscriptions();
    this.initForm();
    this.setTitle(this.title);
    this.currentYear = this.dateService.currentYear;
    this.startYear = this.dateService.startYear;
  }

  /**
   * Set loading and error subscriptions, get confirm route value,
   */
  public initSubscriptions(): void {
    this.routeSubscription = this.route.params
      .subscribe((params: Params) => {
        if (params.confirm) {
          this.confirm = params.confirm;
        }
      });
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  /**
   * Set controls to reset form
   */
  public initForm(): void {
    this.resetForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Add global css auth classes
   */
  ngAfterViewInit() {
    setAuthClasses();
  }

  // convenience getter for easy access to form fields
  get resetFormControls(): { [p: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  /**
   * Reset user password with new credentials
   */
  onSubmit(): void {
    const resetForm = this.resetForm;
    this.success = '';
    this.submitted = true;
    if (resetForm && resetForm.valid) {
      const { password, confirmPassword } = this.resetForm.value;
      const data = { password, confirmPassword };
      const confirm = this.confirm;
      this.submit({ confirm, data });
    }
  }

  /**
   * Dispatch data
   */
  submit(payload: ConfirmResetPasswordPayload): void {
    this.store.dispatch(new PasswordResetConfirm(payload));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
