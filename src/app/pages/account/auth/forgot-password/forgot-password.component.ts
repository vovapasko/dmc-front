import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FORGOT_PASSWORD, LOGIN } from '@constants/titles';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ServerError } from '@models/responses/server/error';
import { AuthenticationService } from '@services/auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { DateService } from '@services/date.service';
import { setAuthClasses } from '@helpers/utility';
import { LoginPayload } from '@models/payloads/auth/login';
import { ForgotPassword, Login } from '@store/actions/user.actions';
import { ForgotPasswordPayload } from '@models/payloads/auth/forgot-password';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  title = FORGOT_PASSWORD;
  forgotPasswordForm: FormGroup;
  submitted = false;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  visible = false;
  currentYear: number;
  startYear: number;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private authService: SocialAuthService,
    private titleService: Title,
    private store: Store<IAppState>,
    private errorService: ErrorService,
    private loadingService: LoadingService,
    private dateService: DateService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initSubscriptions();
    this.setTitle(this.title);
    this.authenticationService.logout();
    this.currentYear = this.dateService.currentYear;
    this.startYear = this.dateService.startYear;
  }

  /**
   * Set loading and error subscriptions
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  /**
   * Init form with validators
   */
  public initForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
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
  get forgotPasswordFormControls(): { [p: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  /**
   * Login user with credentials (login and password)
   */
  public onSubmit(): void {
    this.submitted = true;
    const forgotPasswordForm = this.forgotPasswordForm;
    if (forgotPasswordForm && forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordFormControls;
      const data = { email: email.value};
      this.submit({ data });
    }
  }

  /**
   * Dispatch data
   */
  public submit(payload: ForgotPasswordPayload): void {
    this.store.dispatch(new ForgotPassword(payload));
  }
}
