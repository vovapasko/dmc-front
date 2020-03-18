import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/user.models';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {

    sub;
    title = 'Signup';
    signupForm: FormGroup;
    submitted = false;
    error = '';
    invite = '';
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private authService: AuthenticationService,
        private  userService: UserService
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe((params: Params) => {
            if (params.invite) {
                this.invite = params.invite;
            }
        });

        this.signupForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });

        // set page title
        this.setTitle(this.title);
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
     * On submit form
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        const {firstName, lastName, password, confirmPassword} = this.signupForm.value;
        const payload = {
            data: {
                first_name: firstName,
                last_name: lastName,
                password,
                password_confirm: confirmPassword
            },
            invite: this.invite
        };
        this.userService.signup(payload).subscribe(
            (user: User) => {
                this.authService.login(user.email, payload.data.password).subscribe(
                    response => this.router.navigate(['/']),
                    error => {}// TODO add notification
                );
            },
            error => {
                // TODO add error notification
            }
        );
        console.log(payload);
    }

    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
