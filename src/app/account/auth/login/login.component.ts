import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

    title = 'Login';
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    error = '';
    loading = false;
    visible = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private titleService: Title,
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        // tslint:disable-next-line: no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        // set page title
        this.setTitle(this.title);
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

        this.loading = true;
        const email = this.f.email.value;
        const password = this.f.password.value;
        const data = {email, password};

        this.submit(data);
    }

    /**
     * Submit data
     */
    submit(data) {
        this.authenticationService
            .login({data})
            .pipe(first())
            .subscribe(
                response => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
