import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {AuthenticationService} from '../../../core/services/auth.service';
import {IAppState} from '../../../core/store/state/app.state';
import {Login} from '../../../core/store/actions/user.actions';
import {ErrorService} from '../../../core/services/error.service';
import {LoadingService} from '../../../core/services/loading.service';
import {setAuthClasses} from '../../../core/helpers/utility';
import {ServerError} from "../../../core/models/responses/serverError";

/**
 * This component for login user in crm
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

    title = 'Login';
    loginForm: FormGroup;
    submitted = false;
    loading$: Subject<boolean>;
    error$: Subject<any>;;
    visible = false;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private titleService: Title,
        private store: Store<IAppState>,
        private errorService: ErrorService,
        private loadingService: LoadingService,
    ) {
    }

    ngOnInit() {
        this.initForm();
        this.initSubscriptions();
        this.setTitle(this.title);
        this.authenticationService.logout();
    }

    /**
     * Set loading and error subscriptions
     */
    initSubscriptions() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;
    }

    /**
     * Init form with validators
     */
    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    /**
     * Set page title
     */
    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    /**
     * Add global css auth classes
     */
    ngAfterViewInit() {
        setAuthClasses();
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    /**
     * Login user with credentials (login and password)
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        const f = this.f;
        const email = f.email.value;
        const password = f.password.value;
        const data = {email, password};

        this.submit(data);
    }

    /**
     * Dispatch data
     */
    submit(data) {
        this.store.dispatch(new Login({data}));
    }
}
