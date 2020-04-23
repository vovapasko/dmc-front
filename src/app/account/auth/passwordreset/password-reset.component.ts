import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';

import { MustMatch } from '../../../pages/form/validation/validation.mustmatch';
import { UserService } from '../../../core/services/user.service';
import { PasswordResetConfirm } from '../../../core/store/actions/user.actions';
import { IAppState } from '../../../core/store/state/app.state';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { setAuthClasses } from '../../../core/helpers/utility';
import { ConfirmResetPasswordPayload } from '../../../core/models/payloads/user/confirm-reset-password';
import { ServerError } from '../../../core/models/responses/server/error';

/**
 * This component for change user password
 */

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit, AfterViewInit, OnDestroy {
  routeSubscription: Subscription;
  confirm = '';
  title = 'Reset password';
  resetForm: FormGroup;
  submitted = false;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  success = '';
  visible = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private userService: UserService,
    private store: Store<IAppState>,
    private errorService: ErrorService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.initSubscriptions();
    this.initForm();
    this.setTitle(this.title);
  }

  /**
   * Set loading and error subscriptions, get confirm route value,
   */
  private initSubscriptions(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      if (params.confirm) {
        this.confirm = params.confirm;
      }
    });
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  initForm(): void {
    this.resetForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
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
  get f(): { [p: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  /**
   * Reset user password with new credentials
   */
  onSubmit(): void {
    this.success = '';
    this.submitted = true;
    if (this.resetForm.valid) {
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
