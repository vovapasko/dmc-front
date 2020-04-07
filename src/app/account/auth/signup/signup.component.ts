import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MustMatch} from '../../../pages/form/validation/validation.mustmatch';
import {PasswordResetConfirm, Signup} from '../../../core/store/actions/user.actions';
import {Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/state/app.state';
import {ErrorService} from '../../../core/services/error.service';
import {LoadingService} from '../../../core/services/loading.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {

    inviteSubscription: Subscription;
    title = 'Signup';
    signupForm: FormGroup;
    submitted = false;
    invite = '';
    loading$: Subject<boolean>;
    error$: Subject<boolean>;
    visible = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private store: Store<IAppState>,
        private errorService: ErrorService,
        private loadingService: LoadingService,
    ) {
    }

    ngOnInit() {
        this.inviteSubscription = this.route.params.subscribe((params: Params) => {
            if (params.invite) {
                this.invite = params.invite;
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
        this.signupForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirm: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'passwordConfirm'),
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
        return this.signupForm.controls;
    }

    /**
     * Signup user with first name, last name and password
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        if (!this.invite) {
            alert('У вас нет приглашения, позже вместо этого будет нормальный пуш уведомление');
        }

        const {firstName, lastName, password, passwordConfirm} = this.signupForm.value;
        const data = {firstName, lastName, password, passwordConfirm};
        const invite = this.invite;
        const payload = {data, invite};

        this.submit(payload);
    }

    /**
     * Submit data
     */
    submit(payload) {
        this.store.dispatch(new Signup(payload));
    }

    ngOnDestroy() {
        this.inviteSubscription.unsubscribe();
    }
}
