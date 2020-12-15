import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FORGOT_PASSWORD_CONFIRM } from '@constants/titles';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerError } from '@models/responses/server/error';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '@services/user.service';
import { IAppState } from '@store/state/app.state';
import { Store } from '@ngrx/store';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { DateService } from '@services/date.service';
import { MustMatch } from '@pages/form/validation/validation.mustmatch';
import { setAuthClasses } from '@helpers/utility';
import { ForgotPasswordConfirm } from '@store/actions/user.actions';
import { ForgotPasswordConfirmPayload } from '@models/payloads/auth/forgot-password-confirm';

@Component({
  selector: 'app-forgot-password-confirm',
  templateUrl: './forgot-password-confirm.component.html',
  styleUrls: ['./forgot-password-confirm.component.scss']
})
export class ForgotPasswordConfirmComponent implements OnInit, AfterViewInit, OnDestroy {
  routeSubscription: Subscription;
  token = '';
  uid = '';
  title = FORGOT_PASSWORD_CONFIRM;
  forgotPasswordConfirmForm: FormGroup;
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
        if (params.token) {
          this.token = params.token;
        }
        if (params.uid) {
          this.uid = params.uid;
        }
      });
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  /**
   * Set controls to reset form
   */
  public initForm(): void {
    this.forgotPasswordConfirmForm = this.formBuilder.group(
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
  get forgotPasswordConfirmFormControls(): { [p: string]: AbstractControl } {
    return this.forgotPasswordConfirmForm.controls;
  }

  /**
   * Reset user password with new credentials
   */
  public onSubmit(): void {
    const forgotPasswordConfirmForm = this.forgotPasswordConfirmForm;
    this.success = '';
    this.submitted = true;
    if (forgotPasswordConfirmForm && forgotPasswordConfirmForm.valid) {
      const { password } = this.forgotPasswordConfirmForm.value;
      const data = { password, token: this.token, uid: this.uid };
      this.submit({ data });
    }
  }

  /**
   * Dispatch data
   */
  public submit(payload: ForgotPasswordConfirmPayload): void {
    this.store.dispatch(new ForgotPasswordConfirm(payload));
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
