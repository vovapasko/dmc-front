import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MustMatch} from '../../../pages/form/validation/validation.mustmatch';
import {UserService} from '../../../core/services/user.service';
import {Login, PasswordResetConfirm} from '../../../core/store/actions/user.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/state/app.state';
import {Subject, Subscription} from 'rxjs';
import {ErrorService} from '../../../core/services/error.service';
import {LoadingService} from '../../../core/services/loading.service';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, AfterViewInit, OnDestroy {

    routeSubscription: Subscription;
    confirm = '';
    title = 'Reset password';
    resetForm: FormGroup;
    submitted = false;
    loading$: Subject<boolean>;
    error$: Subject<boolean>;
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
        private loadingService: LoadingService,
    ) {
    }


    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe((params: Params) => {
            if (params.confirm) {
                this.confirm = params.confirm;
            }
        });
        this.initSubscriptions();
        this.initForm();
        this.setTitle(this.title);
    }


    initSubscriptions() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;
    }

    initForm() {
        this.resetForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword'),
        });
    }

    /**
     * Set page title
     */
    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.resetForm.controls;
    }

    /**
     * Reset user password with new credentials
     */
    onSubmit() {
        this.success = '';
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        }

        const {password, confirmPassword} = this.resetForm.value;
        const data = {password, confirmPassword};
        const confirm = this.confirm;

        this.submit(confirm, data);
    }

    /**
     * Submit data
     */
    submit(confirm, data) {
        this.store.dispatch(new PasswordResetConfirm({data}));
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
