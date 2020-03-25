import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/instances/user.models';
import {MustMatch} from '../../../pages/form/validation/validation.mustmatch';

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
    visible = false;

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
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword'),
        });
        // set page title
        this.setTitle(this.title);
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

        this.loading = true;
        const {firstName, lastName, password, confirmPassword} = this.signupForm.value;
        const data = {
            first_name: firstName,
            last_name: lastName,
            password,
            password_confirm: confirmPassword
        };
        const invite = this.invite;
        const payload = {data, invite};

        this.submit(payload);
    }

    /**
     * Submit data
     */
    submit(payload) {
        this.userService.signup(payload).subscribe(
            (user: User) => {
                this.router.navigate(['/profile']);
            },
            error => {
                this.error = error;
                this.loading = false;
            }
        );
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
