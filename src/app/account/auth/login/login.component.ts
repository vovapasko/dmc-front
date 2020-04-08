import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../core/services/auth.service';
import {Title} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/state/app.state';
import {Login} from '../../../core/store/actions/user.actions';
import {Subject} from 'rxjs';
import {ErrorService} from '../../../core/services/error.service';
import {LoadingService} from '../../../core/services/loading.service';

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
    error$: Subject<boolean>;
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
        this.authenticationService.logout();
        this.setTitle(this.title);
    }

    initSubscriptions() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
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

        const email = this.f.email.value;
        const password = this.f.password.value;
        const data = {email, password};

        this.submit(data);
    }

    /**
     * Submit data
     */
    submit(data) {
        this.store.dispatch(new Login({data}));
    }
}
